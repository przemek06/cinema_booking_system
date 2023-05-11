import LoginForm from "../components/authentication/LoginForm";
import "./Style.css";

const sendSignInRequest = async (email, password) => {
    let body = new FormData();
    body.append('username', email);
    body.append('password', password);

    let response = await fetch('http://localhost:8080/login', { 
        method: 'POST',
        body: body,
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
      });

      return response.status
}

const sendRoleRequest = async () => {
    let response = await fetch('http://localhost:8080/anon/role', { 
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
      });

    return response
}

const signIn = async (data, setUser, navigate) => {
    let email = data["Email"]
    let password = data["Password"]
    let status = await sendSignInRequest(email, password)
    if (status == 200){
        let roleRequestResponse =  await sendRoleRequest()
        if (roleRequestResponse.status == 200) {
            let role = await roleRequestResponse.text()
            setUser(role)
            navigate("/")
        } else {
            alert("Internal error occurred. Please try again later.");
            console.log("Error: Internal error occurred during role request");
        }
    } else {
        alert("Invalid email or password. Please try again.");
        console.log("Error: Bad login");
    }
}

const LogIn = ({setUser}) => {
    
    return (
        <div className="body-container screenings-container">
            <LoginForm signIn={signIn} setUser={setUser}/>
        </div>
    )
}

export default LogIn