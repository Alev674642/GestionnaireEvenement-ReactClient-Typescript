import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../login/AuthProvider";
import { URL_SERVER } from "../utils/Utils";
import SortieCard from "./SortieCard";

export default function UniqueSortie() {
  const [message, setMessage] = useState(null);
  let { idsortie } = useParams();

  let auth = useContext(AuthContext);

  useEffect(() => {
    fetch(URL_SERVER + `/api/sortie/${idsortie}`, {
      method: "GET",
      headers: new Headers({
        authorization: "Token " + auth.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='bg-light pt-5 '>
      <div className='container '>
        <h1 className='mb-5 fw-light'>Détails de l'évènement</h1>

        {message && (
          <div className='row'>
            <SortieCard sortie={message}></SortieCard>
          </div>
        )}
      </div>
    </div>
  );
}
