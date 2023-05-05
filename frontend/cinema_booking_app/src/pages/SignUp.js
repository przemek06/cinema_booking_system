import SignupForm from "../components/authentication/SignupForm";
import "./Style.css";

const sendSignUpRequest = async (firstName, lastName, password, email) => {
    let body = {"fullName": firstName + " " + lastName, "password": password, "email": email}

    let res = await fetch('http://localhost:8080/anon/users', { 
        method: 'POST',
        body: JSON.stringify(body),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },    
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
      });

      return res.status
}

const signUp = async (data, navigate) => {
    let firstName = data["First name"]
    let lastName = data["Last name"]
    let password = data["Password"]
    let email = data["Email"]

    let status = await sendSignUpRequest(firstName, lastName, password, email)

    if (status == 200){
        navigate("/login")
    } else {
        // TODO: error message popup on the page
        console.log("errror")
    }
}

const SignUp = () => {
    return (
        <div className="body-container screenings-container">
            <SignupForm signUp={signUp}/>
        </div>
    )
}

export default SignUp