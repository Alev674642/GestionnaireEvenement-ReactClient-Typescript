import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { sortieContext } from "./SortieProvider";
import "react-datepicker/dist/react-datepicker.css";
import SimpleMap from "../map/SimpleMap";
import { AuthContext } from "../login/AuthProvider";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikDatePicker from "./FormikDatePicker";
import { URL_SERVER } from "../utils/Utils";
import Isortie from "../types/Isortie";

interface IformValues{
    name: string;
    description: string;
    imageUrl: string;
    date: number ;
    categorie: string;
    lieu: string;
    lieu2: string;
    price: number ;
}

export default function FormikSortie() :  JSX.Element{
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userPseudo, setUserPseudo] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<number>(0);
  const [lieu, setLieu] = useState("");
  const [lieu2, setLieu2] = useState("");
  const [categorie, setCategorie] = useState("0");
  const [signalee, setSignalee] = useState(false);

  const [showLinkList, setShowLinkList] = useState(" d-none");
  const [idSortieInState, setIdSortieInState] = useState("");

  //indique s'il s'agit d'une modification ou création
  let { idsortie } = useParams();

  let {sortiesContext, setSortiesContext }   = useContext(sortieContext);

  let auth = useContext(AuthContext);
  let navigate = useNavigate();

  //SUBMIT
  let handleSubmit = async (values : IformValues) => {
    /*   e.preventDefault(); */
    setMessage("Formulaire en attente d'être envoyé");
    try {
      const url = idsortie
        ? URL_SERVER + "/api/sortie/" + idsortie
        : URL_SERVER + "/api/sortie";

      let res = await fetch(url, {
        method: idsortie ? "PUT" : "POST",
        headers: new Headers({
          authorization: "Token " + auth.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          imageUrl: values.imageUrl,
          userId: auth.user,
          userPseudo: auth.pseudo,
          price: values.price,
          date: values.date,
          categorie: values.categorie,
          lieu: values.lieu,
          lieu2: values.lieu2,
          signalee: signalee,
        }),
      });

      setMessage("Formulaire envoyé");
      let resJson = await res.json();
      if (res.status === 201) {
        setMessage("Objet créé, message du serveur : " + resJson.message);
        setIdSortieInState(resJson.newId);
        fetchSorties()
        setShowLinkList("");
        navigate(`/sortie/${resJson.newId}`, { replace: true });
      } else if (res.status === 200) {
        setMessage("Object modifié, message du serveur : " + resJson.message);
        setShowLinkList("");
        navigate(`/sortie/${resJson._id}`, { replace: true });
      } else {
        setMessage("Erreur en provenance du serveur :" + resJson);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        data.sort((a:Isortie, b:Isortie) => {
          return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
        });
        /*   filtrerSorties(); */
        return data;
      })
      .then((data) => {
        setSortiesContext(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //USE EFFECT
  useEffect(() => {
    if (idsortie) {
      //Modification d'un évènement existant
      //on doit retrouver l'evenement avec cet id dans le sortiesContext
      const sortieEnModification = sortiesContext.find(
        (sortie) => sortie._id === idsortie
      );

      if(sortieEnModification){
        setName(sortieEnModification.name);
        setDescription(sortieEnModification.description);
        setImageUrl(sortieEnModification.imageUrl);
        setUserPseudo(sortieEnModification.userPseudo);
        setPrice(sortieEnModification.price);
        setDate(Date.parse(sortieEnModification.date));
        setLieu(sortieEnModification.lieu);
        setLieu2(sortieEnModification.lieu2);
        setCategorie(sortieEnModification.categorie);
        setIdSortieInState(idsortie);
        setSignalee(sortieEnModification.signalee);
    }else{
      console.log("Erreur : on ne retrouve pas l'évènement parmis le context de l'application.")
      setUserPseudo(auth.pseudo);
    }
    } else {
      //on renseigne User pseudo
      setUserPseudo(auth.pseudo);
    }
  }, [idsortie]);

  //Pb de localisation en francais du datepicker
  //cf. https://stackoverflow.com/questions/54399084/change-locale-in-react-datepicker
  const days = ["Dim", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const locale = {
    localize: {
      day: (n:number) => days[n],
      month: (n:number) => months[n],
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
    },
  };

  return (
    <div className='bg-light pt-5'>
      <h1 className='mb-5 fw-light'>
        {idsortie
          ? "Formulaire modification sortie"
          : "Formulaire création sortie"}
      </h1>
      <Formik
        initialValues={{
          name: name ? name : "",
          description: description ? description : "",
          imageUrl: imageUrl ? imageUrl : "",
          date: date ? date : "",
          categorie: categorie ? categorie : "0",
          lieu: lieu ? lieu : "",
          lieu2: lieu2 ? lieu2 : "",
          price: price !== null ? price : "",
          /* signalee: signalee ? signalee : "", */
        } as IformValues}
        enableReinitialize={true}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "3 caractères minimum")
            .max(30, "30 caractères maximum")
            .required("Information indispensable"),
          description: Yup.string()
            .min(3, "3 caractères minimum")
            .required("Information indispensable"),
          imageUrl: Yup.string()
            .min(3, "3 caractères minimum")
            .required("Information indispensable"),
          price: Yup.number().required("Information indispensable"),
          categorie: Yup.number()
            .moreThan(0, "Choisissez une catégorie.")
            .required("Information indispensable"),
          lieu: Yup.string()
            .min(3, "3 caractères minimum")
            .max(30, "30 caractères maximum")
            .required("Information indispensable"),
          lieu2: Yup.string()
            .min(3, "3 caractères minimum")
            .max(30, "30 caractères maximum")
            .required("Information indispensable"),
          date: Yup.string().required("Information indispensable"),
        })}
        onSubmit={(values : IformValues, { setSubmitting }: FormikHelpers<IformValues>) => {
          /*   setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400); */
          handleSubmit(values);
        }}>
        {(props) => (
          <Form
            className='my-5 border p-5 text-start container'
            /*  onSubmit={handleSubmit} */
          >
            <div className='form-group mb-3'>
              <label htmlFor='name'>Nom de l'évènement</label>
              <Field
                type='text'
                className='form-control'
                id='name'
                name='name'
                placeholder='Nom de la sortie'
                /*  onChange={(e) => setName(e.target.value)} */
                /*  value={name ? name : ""} */
              ></Field>
              <span className='text-danger'>
                <ErrorMessage name='name' />
              </span>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='form-group mb-3'>
                  <label htmlFor='date'>Date de l'évènement</label>
                  {/* <input
            type='text'
            id='date'
            className='form-control'
            placeholder='Date'
            onChange={(e) => setDate(e.target.value)}
            value={date ? date : ""}></input> */}
                  <FormikDatePicker
                    dateFormat='dd/MM/yyyy HH:mm'
                    locale={locale}
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={15}
                    timeCaption='⌚'
                    id='date'
                    name='date'
                    /*  selected={date} */
                    /* onChange={(date) => {
                    setDate(date);
                  }} */
                  />
                  <span className='text-danger'>
                    <ErrorMessage name='date' />
                  </span>
                </div>
              </div>
              <div className='col '>
                <label htmlFor='categorie'>Catégorie</label>
                <Field
                  as='select'
                  className='form-select'
                  aria-label='Default select example'
                  id='categorie'
                  name='categorie'
                  /*  value={categorie ? categorie : "0"}
                onChange={(e) => setCategorie(e.target.value)} */
                >
                  <option value='0'></option>
                  <option value='1'>🎬 Cinema</option>
                  <option value='2'>🍴 Restaurant</option>
                  <option value='3'>🍺 Bar</option>
                  <option value='4'>🎸 Concert</option>
                  <option value='5'>🎲 Jeux</option>
                  <option value='6'>🎨 Exposition</option>
                  <option value='7'>🏀 Sport</option>
                  <option value='8'>👓 Plage</option>
                  <option value='9'>🌳 Nature</option>
                  <option value='10'>❔ Autre</option>
                </Field>{" "}
                <span className='text-danger'>
                  <ErrorMessage name='categorie' />
                </span>
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='description'>Description</label>
                <Field
                  type='text'
                  className='form-control'
                  id='description'
                  name='description'
                  placeholder='Description'
                  /*  onChange={(e) => setDescription(e.target.value)}
                value={description ? description : ""} */
                ></Field>{" "}
                <span className='text-danger'>
                  <ErrorMessage name='description' />
                </span>
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='lieu2'>Ville</label>
                <div className='row mb-3'>
                  <div className='col'>
                    <Field
                      type='text'
                      className='form-control'
                      id='lieu2'
                      name='lieu2'
                      placeholder='Ville'
                      /* onChange={(e) => setLieu2(e.target.value)} */
                      /*  value={lieu2 ? lieu2 : ""} */
                    ></Field>
                    <span className='text-danger'>
                      <ErrorMessage name='lieu2' />
                    </span>
                  </div>
                </div>
                <label htmlFor='lieu'>Adresse</label>
                <div className='row'>
                  <div className='col'>
                    <Field
                      type='text'
                      className='form-control'
                      id='lieu'
                      name='lieu'
                      placeholder='Adresse'
                      /* onChange={(e) => setLieu(e.target.value)} */
                      /*  value={lieu ? lieu : ""} */
                    ></Field>{" "}
                    <span className='text-danger'>
                      <ErrorMessage name='lieu' />
                    </span>
                  </div>
                </div>

                {/*  <div className='col-md-2 text-center'>
              <button className='btn btn-primary'>Carte</button>
            </div> */}
                <div className='row'>
                  <div className='col text-center'>
                    <SimpleMap
                      lieu={
                        props.values.lieu + " " + props.values.lieu2
                      }></SimpleMap>
                  </div>
                </div>
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='imageUrl'>Image de l'évènement (URL)</label>
                <Field
                  type='text'
                  className='form-control'
                  id='imageUrl'
                  name='imageUrl'
                  placeholder='Image URL'
                  /*  onChange={(e) => setImageUrl(e.target.value)}
                  value={imageUrl ? imageUrl : ""} */
                ></Field>{" "}
                <span className='text-danger'>
                  <ErrorMessage name='imageUrl' />{" "}
                </span>
              </div>
              <div className='text-center'>
                <img
                  src={
                    props.values.imageUrl
                      ? props.values.imageUrl
                      : process.env.PUBLIC_URL + "/Calendar-unsplash.jpg"
                  }
                  alt='Image évènement'
                  style={{ maxWidth: "100%", maxHeight: "450px" }}></img>
              </div>

              <div className='form-group mb-3'>
                <label htmlFor='userPseudo'>Créateur de l'évenement</label>
                <Field
                  type='text'
                  /* className='form-control' */
                  className='form-control'
                  id='userPseudo'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserPseudo(e.target.value)}
                  value={userPseudo ? userPseudo : ""}
                  disabled></Field>
              </div>
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='price'>Tarif de l'évènement (€)</label>
              <Field
                type='text'
                className='form-control'
                id='price'
                name='price'
                placeholder='Prix en €'
                /*  onChange={(e) => setPrice(e.target.value)}
              value={price} */
              ></Field>{" "}
              <span className='text-danger'>
                <ErrorMessage name='price' />
              </span>
            </div>
            <div
              className='w-100 text-center'
              style={{ overflowWrap: "break-word" }}>
              <OverlayTrigger
                placement='top'
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id={`tooltip-right`}>
                    Cliquez pour enregistrer le nouvel évènement.
                  </Tooltip>
                }>
                <button type='submit' className='btn btn-primary mx-auto mt-5'>
                  Enregistrer l'évènement
                </button>
              </OverlayTrigger>

              <h4 className='mt-3'>{message}</h4>
            </div>
            <div className='text-center w-100'>
              <Link
                to='/listeSorties'
                className={`btn btn-outline-primary btn-sm mx-1 mt-3 ${showLinkList}`}>
                Retour à la liste des évènements
              </Link>
            </div>
            <div className='text-center w-100'>
              <Link
                to={`/sortie/${idSortieInState}`}
                className={`btn btn-outline-primary btn-sm mx-1 mt-3 ${showLinkList}`}>
                {" "}
                Afficher l'évènement
              </Link>
            </div>
          </Form>
        )}
      </Formik>
      <br />
    </div>
  );
}
