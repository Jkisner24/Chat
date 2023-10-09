import { useUser } from '../../Hooks/loginHook.jsx';
import style from './Login.module.css'

function Login() {
  const { username } = useUser();

  if (username === '') {
    return (
      <div>
        <h4 className={style.titles}>Welcome, Guest!</h4>
      </div>
    );
  } else {
    return (
      <div>
        <h4 className={style.titles}>Hi, {username}!</h4>
      </div>
    );
  }
}

export default Login;
