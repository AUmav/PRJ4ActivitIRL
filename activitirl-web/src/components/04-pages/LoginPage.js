import LoginForm from "../02-organisms/forms/loginForm/LoginForm"

const LoginPage = () => {
    let token = localStorage.getItem("loginToken");
    return (
        <div>
            {!token && <LoginForm/>}
            {token && <h1>Log ud for at logge ind på en ny bruger</h1>}
        </div>
    )
}

export default LoginPage;