import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_SERVER } from "../utils/Utils";
import { AuthContext } from "./AuthProvider";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");

  let navigate = useNavigate();
  let auth = react.useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = URL_SERVER + "/api/auth/signup";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        pseudo: pseudo,
      }),
    });
    let resJson = await res.json();
    if (res.status === 201) {
      auth.signin(resJson.userId, resJson.token, resJson.pseudo, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate("/login", { replace: true });
      });
    } else {
      console.log(resJson);
    }
  };

  return (
    <div className='container border rounded mt-5 py-3'>
      <h1 className='fw-light mb-4'>Identifiez vous svp</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='pseudo' className='form-label'>
            Pseudonyme :
          </label>
          <input
            type='text'
            className='form-control'
            id='pseudo'
            onChange={(e) => setPseudo(e.target.value)}
          />
          <div id='emailHelp' className='form-text'>
            Votre adresse mail ne sera jamais communiqué à une autre entité.
          </div>
        </div>
        <div className='mb-3'>
          <label for='exampleInputEmail1' className='form-label'>
            Adresse mail :
          </label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id='emailHelp' className='form-text'>
            Votre adresse mail ne sera jamais partagé avec des entités tierses.
          </div>
        </div>
        <div className='mb-3'>
          <label for='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Créer mon compte
        </button>
        {/* <h3 className='mt-3'>{message}</h3>
        <p className='mt-3 text-break'>UserId : {userId}</p>
        <p className='mt-3 text-break '>Token : {token}</p> */}
      </form>
    </div>
  );
}
