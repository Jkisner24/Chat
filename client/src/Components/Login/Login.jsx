import { useUser } from '../../Hooks/loginHook.jsx';
import style from './Login.module.css'

function Login() {
  const { username } = useUser();

  // Comprobamos si el valor de username es el valor por defecto
  if (username === '') {
    // Si es el valor por defecto, mostramos el mensaje por defecto
    return (
      <div>
        <h4 className={style.titles}>Welcome, Guest!</h4>
      </div>
    );
  } else {
    // Si no es el valor por defecto, mostramos el valor ingresado por el usuario
    return (
      <div>
        <h4 className={style.titles}>Hi, {username}!</h4>
      </div>
    );
  }
}

export default Login;
