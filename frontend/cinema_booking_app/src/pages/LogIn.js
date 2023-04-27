import LoginForm from "../components/LoginForm";
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
            // TODO: handle internal error
            console.log("error 2")
        }
    } else {
        // TODO: handle bad log in
        console.log("error")
    }
}

const LogIn = ({setUser}) => {
    
    return (
        <div style={{height: '300px'}} className="body-container screenings-container">
            <LoginForm signIn={signIn} setUser={setUser}/>
        </div>
    )
}

export default LogIn