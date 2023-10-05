import { useState, useEffect, createContext, useContext } from 'react';
import Swal from 'sweetalert2';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('Guest'); 
  const [isAlertShown, setIsAlertShown] = useState(false);

  const showAlert = () => {
    Swal.fire({
      title: 'Welcome, choose how to enter!',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enter name',
      cancelButtonText: 'Sign in as a guest',
      showLoaderOnConfirm: true,
      preConfirm: async (login, action) => {
        setIsLoading(true);
        try {
          if (action === 'cancel') {
            setUsername('Guest');
          } else {
            const response = await fetch('http://localhost:3001/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userName: login }),
            });

            if (response.status === 201) {
              setUsername(login);
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
    localStorage.removeItem('alertShown');
    showAlert();
  }, []);

  useEffect(() => {
    return () => {
      setIsAlertShown(true);
    };
  }, [isAlertShown]);

  return (
    <UserContext.Provider value={{ isLoading, username }}>
      {children}
    </UserContext.Provider>
  );
};
