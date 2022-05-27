import react, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import "../../App.css";
import { URL_SERVER } from "../utils/Utils";

interface LocationState {
    from: {
      pathname: string;
    };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  let location = useLocation();
  let auth = react.useContext(AuthContext);

  let from:string;
  try {
    from = (location.state as LocationState).from.pathname || "/";
  } catch (e) {
    from = "/";
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = URL_SERVER + "/api/auth/login";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      auth.signin(resJson.userId, resJson.token, resJson.pseudo, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      });
    } else {
      console.log(resJson.error);
    }
  };

  return (
    <div className='container border rounded mt-5 py-3'>
      <h1 className='fw-light mb-4 '>
        Identifiez-vous pour acceder à l'application
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label
            htmlFor='exampleInputEmail1'
            className='form-label p-font-mystyle'>
            Adresse mail
          </label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id='emailHelp' className='form-text p-font-mystyle'>
            Votre adresse mail ne sera jamais communiqué à une autre entité.
          </div>
        </div>

        <div className='mb-3'>
          <label
            htmlFor='exampleInputPassword1'
            className='form-label p-font-mystyle'>
            Mot de passe
          </label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='d-flex w-100 flex-column'>
          <button type='submit' className='btn btn-primary mx-auto mb-3'>
            Valider
          </button>
          <Link to='/signin' className='btn btn-outline-primary mx-auto '>
            Créer un nouveau compte
          </Link>
        </div>
        <div
          className=' border pt-4 pb-2 mt-3 mx-3 d-flex flex-column'
          style={{ background: "#E8F0FE" }}>
          <p style={{ fontWeight: "bold" }}>
            A titre d'exemple, vous pouvez utiliser le compte suivant :{" "}
          </p>
          <p>Adresse mail : 123@123.com</p>
          <p>Mot de passe : 123</p>
        </div>
      </form>
    </div>
  );
}
