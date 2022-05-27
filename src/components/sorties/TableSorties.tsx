import react from "react";
import { Column, useSortBy, useTable } from "react-table";
import BTable from "react-bootstrap/Table";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import useWindowDimensions from "../utils/useWindowDimensions";
import Isortie from "../types/Isortie";

export const categorieToIcon = (categorie : string) => {
  switch (categorie) {
    case "1":
      return (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id={`tooltip-right`}>Cinéma</Tooltip>}>
          <span>🎬</span>
        </OverlayTrigger>
      );
    //break;
    case "2":
      return (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id={`tooltip-right`}>Restaurant / Dinner</Tooltip>}>
          <span>🍴</span>
        </OverlayTrigger>
      );
    //break;
    case "3":
      return (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id={`tooltip-right`}>Bar / Sortie en ville</Tooltip>
          }>
          <span>🍺</span>
        </OverlayTrigger>
      );
    //break;
    case "4":
      return (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id={`tooltip-right`}>Concert / Evènement musical</Tooltip>
          }>
          <span>🎸</span>
        </OverlayTrigger>
      );
    //break;
    case "5":
      return (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id={`tooltip-right`}>Jeux / Tournoi / Casino</Tooltip>
          }>
          <span>🎲</span>
        </OverlayTrigger>
      );
    // break;
    case "6":
      return (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id={`tooltip-right`}>
              Exposition / Musée / Vernissage / Evènement artistique
            </Tooltip>
          }>
          <span>🎨</span>
        </OverlayTrigger>
      );
    // break;
    case "7":
      return (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id={`tooltip-right`}>
              Sport / Tournoi / Evenement sportif / Activité extérieure
            </Tooltip>
          }>
          <span>🏀</span>
        </OverlayTrigger>
      );
    // break;
    case "8":
      return (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id={`tooltip-right`}>
              Plage / Piscine / Se relaxer au soleil
            </Tooltip>
          }>
          <span>👓</span>
        </OverlayTrigger>
      );
    // break;
    case "9":
      return (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id={`tooltip-right`}>
              Activité en site naturel, parc, forêt / Picnic / Randonnée /
              Activité de plein air
            </Tooltip>
          }>
          <span>🌳</span>
        </OverlayTrigger>
      );
    // break;
    case "10":
      return (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id={`tooltip-right`}>Autre type d'activité</Tooltip>
          }>
          <span>❔</span>
        </OverlayTrigger>
      );
    // break;

    default:
      break;
  }
};

interface Iprops{
  data : Isortie[]
}

export default function TableSorties({ data } : Iprops) {
  const { width } = useWindowDimensions();

  const columns: Column<Isortie>[] = react.useMemo(() => {
    if (width > 1000) {
      return [
        {
          Header: "Categorie",
          accessor: "categorie",
          Cell: (props : any) => {
            return <span>{categorieToIcon(props.value)}</span>;
          },
        },
        {
          Header: "Nom de la sortie",
          accessor: "name",
        },
        {
          Header: "Ville",
          accessor: "lieu2",
        },
        {
          Header: "Date",
          accessor: "date",
          Cell: (props: any) => {
            const custom_date = dateFormat(props.value, "dd/mm/yyyy HH:MM");
            return <span>{custom_date}</span>;
          },
        },

        {
          Header: "Createur",
          accessor: "userPseudo",
        },
        {
          Header: "Prix",
          accessor: "price",
          Cell: ({ value }: {value: any;}) =>
            value > 0 ? (
              <span>{value}€</span>
            ) : (
              <span
                style={{ color: "green", fontWeight: "bold" }}
                data-bs-toggle='tooltip'
                data-bs-placement='top'
                title='Sortie gratuite.'>
                Gratuit
              </span>
            ),
        },
        {
          Header: "Action",
          accessor: "_id",
          Cell: ({ value }: {value: any;}) => (
            <Link
              className='btn btn-outline-primary btn-sm mx-1 ('
              to={`/sortie/${value}`}>
              Détails
            </Link>
          ),
        },
        {
          Header: "Statut",
          accessor: "signalee",
          Cell: (props: {value: any;}) => {
            return (
              <span>
                {props.value ? (
                  <OverlayTrigger
                    placement='left'
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`tooltip-right`}>
                        Cet évènement à été signalé par un utilisateur. Il est
                        actuellement verrouillé jusqu'à vérification par un
                        administrateur.
                      </Tooltip>
                    }>
                    <span>❌</span>
                  </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                    placement='left'
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`tooltip-right`}>
                        Cet évènement n'a pas été signalé. Si vous constatez un
                        problème, merci de le signaler.
                      </Tooltip>
                    }>
                    <span>✔</span>
                  </OverlayTrigger>
                )}
              </span>
            );
          },
        },
      ];
    } else if (width > 800) {
      return [
        {
          Header: "Categorie",
          accessor: "categorie",
          Cell: (props: {value: any;}) => {
            return <span>{categorieToIcon(props.value)}</span>;
          },
        },
        {
          Header: "Nom de la sortie",
          accessor: "name",
        },
        {
          Header: "Ville",
          accessor: "lieu2",
        },
        {
          Header: "Date",
          accessor: "date",
          Cell: (props: {value: any;}) => {
            const custom_date = dateFormat(props.value, "dd/mm/yyyy HH:MM");
            return <span>{custom_date}</span>;
          },
        },

        {
          Header: "Createur",
          accessor: "userPseudo",
        },

        {
          Header: "Action",
          accessor: "_id",
          Cell: ({ value }: {value: any;}) => (
            <Link
              className='btn btn-outline-primary btn-sm mx-1 ('
              to={`/sortie/${value}`}>
              Détails
            </Link>
          ),
        },
      ];
    } else {
      return [
        /*  {
            Header: "ID",
            accessor: "_id",
          }, */

        {
          Header: "",
          accessor: "categorie",
          Cell: (props: {value: any;}) => {
            return <span>{categorieToIcon(props.value)}</span>;
          },
        },
        {
          Header: "Titre",
          accessor: "name",
        },
        {
          Header: "Ville",
          accessor: "lieu2",
        },
        {
          Header: "Date",
          accessor: "date",
          Cell: (props: {value: any;}) => {
            const custom_date = dateFormat(props.value, "dd/mm/yy HH:MM");
            return <span>{custom_date}</span>;
          },
        },

        {
          Header: "Action",
          accessor: "_id",
          Cell: ({ value }: {value: any;}) => (
            <Link
              className='btn btn-outline-primary btn-sm mx-0 mx-md-1 ('
              to={`/sortie/${value}`}>
              Détails
            </Link>
          ),
        },
      ];
    }
  }, [width]);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // Render the UI for your table
  return (
    <BTable striped bordered hover responsive size='sm' {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </BTable>
  );
}
