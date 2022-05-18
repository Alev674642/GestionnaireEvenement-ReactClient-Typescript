import React from "react";

export default function FiltreSorties({ filtres, setFiltres }) {
  return (
    <div className='d-flex justify-content-center '>
      <form className=' row row-cols-lg-auto gx-3 gy-2 align-items-center mb-5 '>
        <div className='col-12'>
          <label htmlFor='categorie'>Catégorie</label>
        </div>
        <div className='col-12'>
          <select
            className='form-select col-12'
            aria-label='Default select example'
            id='categorie'
            name='categorie'
            onChange={(e) => {
              setFiltres({ ...filtres, categorie: e.target.value });
            }}>
            <option defaultValue value='0'></option>
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
          </select>
        </div>
        <div className='col-12'>
          <label htmlFor='filtreVille' className='form-label  mb-0'>
            Ville
          </label>
        </div>
        <div className='col-12'>
          <input
            type='text'
            className='form-control form-control-sm '
            id='filtreVille'
            onChange={(e) => {
              setFiltres({ ...filtres, ville: e.target.value });
            }}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='filtrePrix' className='form-label  mb-0'>
            Prix maximum
          </label>
        </div>
        <div className='col-12'>
          <input
            type='text'
            className='form-control form-control-sm '
            id='filtrePrix'
            onChange={(e) => {
              setFiltres({ ...filtres, prixMax: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  );
}
