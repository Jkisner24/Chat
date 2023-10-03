import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function userLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('Guest');
  
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
              const response = await fetch('http://127.0.0.1:3001/api/register', {
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

  return { isLoading, username };
}

export default userLogin;
