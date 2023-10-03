import userLogin from "../../Hooks/loginHook.jsx";

function Login() {
  const { isLoading, username } = userLogin();
  console.log({isLoading, username})
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && username && (
        <h2>
           Hello, {username}!
        </h2>
      )}
    </div>
  );
}

export default Login;