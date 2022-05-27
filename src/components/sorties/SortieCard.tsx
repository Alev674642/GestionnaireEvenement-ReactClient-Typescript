import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import dateFormat from "dateformat";
import SimpleMap from "../map/SimpleMap";
import { AuthContext } from "../login/AuthProvider";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { URL_SERVER } from "../utils/Utils";
import Isortie from "../types/Isortie";

export default function SortieCard({ sortie }:{sortie : Isortie}) {
  const [message, setMessage] = useState("");

  let auth = useContext(AuthContext);
  let navigate = useNavigate();

  const handleDelete = async (idSortie: string) => {
    try {
      const url = URL_SERVER + "/api/sortie/" + idSortie;

      let res = await fetch(url, {
        method: "DELETE",
        headers: new Headers({
          authorization: "Token " + auth.token,
        }),
        body: JSON.stringify({
          id: idSortie,
        }),
      });

      setMessage("Formulaire envoyé");
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("Objet supprimé, message du serveur : " + resJson.message);
        navigate("/listeSorties");
      } else {
        setMessage("Erreur en provenance du serveur :" + resJson);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignalee = async (idSortie : string) => {
    try {
      const url = URL_SERVER + "/api/sortie/" + idSortie;

      let res = await fetch(url, {
        method: "PUT",
        headers: new Headers({
          authorization: "Token " + auth.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          name: sortie.name,
          description: sortie.description,
          imageUrl: sortie.imageUrl,
          userId: auth.user,
          userPseudo: sortie.userPseudo,
          price: sortie.price,
          date: sortie.date,
          categorie: sortie.categorie,
          lieu: sortie.lieu,
          lieu2: sortie.lieu2,
          signalee: true,
        }),
      });

      setMessage("Formulaire envoyé");
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("Object modifié, message du serveur : " + resJson.message);
      } else {
        setMessage("Erreur en provenance du serveur :" + resJson);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=' col align-self-center mb-5'>
      <div className='card mx-auto my-1 w-80 border-secondary'>
        <img
          src={sortie.imageUrl ? sortie.imageUrl : ""}
          alt='Evènement'
          className='card-img-top'></img>

        <div className='card-body py-5'>
          <h5 className='card-title pb-3 fs-1'>{sortie.name}</h5>
          <h5 className='card-title pb-3 fs-3 text-success'>
            {sortie.lieu} {sortie.lieu2}
          </h5>
          <h6 className='card-subtitle mb-2 text-muted fs-3'>
            {dateFormat(sortie.date, "dd/mm/yyyy HH:MM")}
          </h6>
          <p className='card-text fs-4'>{sortie.description}</p>
          <p className='card-text fs-4 fw-bold'>
            {sortie.price > 0 ? `${sortie.price} €` : "Gratuit"}
          </p>
          <p className='card-text fs-6 fw-light text-primary fst-italic'>
            - Evènement créé par {sortie.userPseudo} -
          </p>

          <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id={`tooltip-right`}>
                Cliquez pour modifier cet évènement. Cette action est possible
                uniquement si vous êtes le créateur de la sortie.
              </Tooltip>
            }>
            <span className='d-inline-block'>
              <Link
                className={`btn btn-outline-primary btn-sm mx-1 ${
                  auth.user === sortie.userId ? "" : "disabled"
                }`}
                to={`/formulairesortie/${sortie._id}`}>
                Modifier
              </Link>
            </span>
          </OverlayTrigger>

          <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id={`tooltip-right`}>
                Cliquez pour supprimer cet évènement. Cette action est possible
                uniquement si vous êtes le créateur de la sortie.
              </Tooltip>
            }>
            <span className='d-inline-block'>
              <button
                className={`btn btn-outline-primary btn-sm mx-1 ${
                  auth.user === sortie.userId ? "" : "disabled"
                }`}
                onClick={() => handleDelete(sortie._id)}>
                Supprimer
              </button>
            </span>
          </OverlayTrigger>

          {auth.user !== sortie.userId && (
            <OverlayTrigger
              placement='top'
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id={`tooltip-right`}>
                  Cliquez pour signaler cet évènement. Il sera verrouillé
                  jusqu'à être contrôlé par un administrateur.
                </Tooltip>
              }>
              <button
                className='btn btn-outline-primary btn-sm mx-1'
                onClick={() => handleSignalee(sortie._id)}>
                Signaler ❌
              </button>
            </OverlayTrigger>
          )}
          <div>
            <SimpleMap lieu={sortie.lieu}></SimpleMap>
          </div>
          <h4 className='mt-3'>{message}</h4>
        </div>
      </div>
    </div>
  );
}
