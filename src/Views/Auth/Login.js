import AuthService from "../../services/auth.service";

const LoginPage=(props)=> {

    const handleLogin = () => {
        AuthService.login('', '').then(
            res => {
                console.log(res)
            },
            error => {
                console.log(error)
            }
        );

    }

    return (
        <div>
            Login Page
        </div>
    )
}

export default LoginPage();