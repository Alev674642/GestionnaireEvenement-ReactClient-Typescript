import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../login/AuthProvider";
import CircularProgress from "../utils/CircularProgress";
import { URL_SERVER } from "../utils/Utils";
import { sortieContext } from "./SortieProvider";
import { categorieToIcon } from "./TableSorties";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "../../App.css";
import dateFormat from "dateformat";
import Isortie from "../types/Isortie";

export default function VisionneuseEvenements() {
  const [sorties, setSorties] = useState([]);
  const { setSortiesContext } = useContext(sortieContext);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  let auth = useContext(AuthContext);

  useEffect(() => {
    fetchSorties();
  }, []);

  let fetchSorties = () => {
    setLoading(true);
    fetch(URL_SERVER + "/api/sortie/", {
      method: "GET",
      headers: new Headers({
        authorization: "Token " + auth.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        data.sort((a:Isortie, b:Isortie) => {
          return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
        });

        setSorties(data);

        /*   filtrerSorties(); */
        return data;
      })
      .then((data) => {
        setSortiesContext(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index >= sorties.length - 1 ? 0 : index + 1);
    }, 100000);
    return () => clearInterval(slider);
  }, [index]);

  const setArticleClass = (indexArticle:number) => {
    if (index === 0 && indexArticle === sorties.length - 1)
      return "card my-5 col-6 visionneuseCard lastSlide";
    else if (index === sorties.length - 1 && indexArticle === 0)
      return " card my-5 col-6 visionneuseCard nextSlide";
    else if (indexArticle === index)
      return "card my-5 col-6 visionneuseCard activeSlide";
    else if (indexArticle === index - 1)
      return "card my-5 col-6 visionneuseCard lastSlide";
    else return "card my-5 col-6 visionneuseCard nextSlide";
  };

  if (loading) {
    return (
      <div
        className='bg-light d-flex  justify-content-center align-items-center'
        style={{ minHeight: "80vh" }}>
        <CircularProgress className='my-5' />
      </div>
    );
  } else {
    return (
      <div className='mx-auto d-flex flex-column align-items-center'>
        <h1 className='mt-5 mb-2'> Visionneuse évènements</h1>

        <div className='section-center '>
          <button
            className='prev fs-1'
            onClick={() => {
              console.log(index);
              setIndex(index <= 0 ? sorties.length - 1 : index - 1);
            }}>
            <FiChevronLeft />
          </button>
          {sorties.map((sortie : Isortie, sortieIndex) => {
            return (
              <div
                key={sortie._id}
                className={setArticleClass(sortieIndex)}
                style={{ maxWidth: "80%" }}>
                <h5 className='card-header'>
                  <h1 style={{ display: "inline-block", fontSize: "normal" }}>
                    {sortie.name}
                    <span className='ms-4'>
                      {categorieToIcon(sortie.categorie)}
                    </span>
                    <p className='mt-3 mb-0 fs-3'>
                      {dateFormat(sortie.date, "dd/mm/yyyy HH:MM")}
                    </p>
                  </h1>
                </h5>
                <div style={{ padding: "auto" }}>
                  <img
                    src={sortie.imageUrl}
                    className='card-img-top mx-auto my-auto imageCard'
                    alt={sortie.name}
                  />
                </div>
                <div className='card-body'>
                  <p className='card-text fs-4'>{sortie.description}</p>
                  <p className='card-text fs-4 fw-bold'>
                    {sortie.price > 0 ? `${sortie.price} €` : "Gratuit"}
                  </p>
                  <p className='card-text fs-5 fw-light text-primary fst-italic'>
                    - Evènement créé par {sortie.userPseudo} -
                  </p>
                </div>
                <div className='card-footer text-muted fs-3'>
                  {sortie.lieu} {sortie.lieu2}
                </div>
              </div>
            );
          })}
          <button
            className='next fs-1 ms-5'
            onClick={() => {
              setIndex(index >= sorties.length - 1 ? 0 : index + 1);
            }}>
            <FiChevronRight />
          </button>
        </div>
      </div>
    );
  }
}
