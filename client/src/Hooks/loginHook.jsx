import { useState, useEffect, createContext, useContext } from 'react';
import Swal from 'sweetalert2';
import { socket } from '../Components/App/App.jsx';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [userConnected, setUserConnected] = useState(false);

  const showLoginAlert = () => {
    Swal.fire({
      title: 'Welcome, choose how to enter!',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enter name',
      cancelButtonText: 'Sign in as a guest',
      allowOutsideClick: false,
      showLoaderOnConfirm: true,
      preConfirm: async (login, action) => {
        setIsLoading(true);
        try {
          if (action === 'cancel') {
            setUsername('Guest');
          } else {
            const response = await fetch('https://chat-umgd.onrender.com/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userName: login }),
            });

            if (response.status === 201) {
              setUsername(login);
              socket.emit('user-connected', { nameUser: login });
              setUserConnected(true);
              Swal.fire({
                title: 'User Connected',
                text: 'Welcome to live chat!',
                icon: 'success',
              });
            } else if (response.status === 400) {
              Swal.fire('Username already exists. Please choose a different one.');
            } else {
              Swal.fire('An error occurred. Please try again.');
            }
          }
        } catch (error) {
          console.error('Error:', error);
          Swal.fire('An error occurred. Please try again.');
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  useEffect(() => {
    socket.on('userConnectedMessage', (message) => {
      if (userConnected) {
        Swal.fire({
          position: 'bottom-right',
          icon: 'info',
          title: 'New User Connected',
          text: message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });

    return () => {
      socket.off('userConnectedMessage');
    };
  }, [userConnected]);

  useEffect(() => {
    showLoginAlert();
  }, []);

  return (
    <UserContext.Provider value={{ isLoading, username }}>
      {children}
    </UserContext.Provider>
  );
};
