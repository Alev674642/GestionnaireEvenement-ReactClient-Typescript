import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../login/AuthProvider";
import { sortieContext } from "./SortieProvider";
import TableSorties from "./TableSorties";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import FiltreSorties from "./FiltreSorties";
import { URL_SERVER } from "../utils/Utils";

export default function ListeSorties() {
  const [sorties, setSorties] = useState([]);
  const { setSortiesContext } = useContext(sortieContext);
  let auth = useContext(AuthContext);
  const [filtres, setFiltres] = useState({
    ville: "",
    prixMax: -1,
    categorie: 0,
  });

  useEffect(() => {
    fetchSorties();
  }, []);

  let fetchSorties = () => {
    fetch(URL_SERVER + "/api/sortie/", {
      method: "GET",
      headers: new Headers({
        authorization: "Token " + auth.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        data.sort((a, b) => {
          return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
        });

        setSorties(data);

        /*   filtrerSorties(); */
        return data;
      })
      .then((data) => {
        setSortiesContext(data);
      })
      .catch((error) => console.log(error));
  };

  const filtrerSortieDynamique = () => {
    let sortiesFiltreesDynamiques = sorties;
    if (sortiesFiltreesDynamiques !== null) {
      if (filtres.ville !== "")
        sortiesFiltreesDynamiques = sortiesFiltreesDynamiques.filter((item) => {
          return item.lieu2.includes(filtres.ville);
        });

      if (
        filtres.prixMax !== null &&
        filtres.prixMax !== "" &&
        filtres.prixMax > -1
      ) {
        sortiesFiltreesDynamiques = sortiesFiltreesDynamiques.filter(
          (item) => item.price <= filtres.prixMax
        );
      }
      if (
        filtres.categorie !== null &&
        filtres.categorie !== "0" &&
        filtres.categorie !== 0
      ) {
        sortiesFiltreesDynamiques = sortiesFiltreesDynamiques.filter(
          (item) => item.categorie === filtres.categorie
        );
      }
    }
    return sortiesFiltreesDynamiques;
  };

  return (
    <div className='bg-light  pt-5'>
      <div className='container'>
        <h1 className='mb-5 fw-light'>Liste des sorties et évènements</h1>
        <br />
        <div>
          <FiltreSorties
            filtres={filtres}
            setFiltres={setFiltres}></FiltreSorties>
        </div>
        <div className='table-border-mystyle'>
          <TableSorties data={filtrerSortieDynamique(sorties)} />
        </div>
        <br />
        <div className='container'>
          <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id={`tooltip-right`}>
                Cliquer pour créer un nouvel évènement.
              </Tooltip>
            }>
            <Link
              type='button'
              className='btn btn-primary mb-5'
              to='/formulairesortieFormik'>
              Créér un nouvel évènement
            </Link>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
}
