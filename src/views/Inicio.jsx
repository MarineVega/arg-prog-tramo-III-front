import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
//import axios from 'axios';

import TablaDeDatos from '../components/TablaDeDatos.jsx';

const Inicio = () => {
                          // Lista es un array vacío
  const [lista, setLista] = useState([]);

  const cargarLista = async () => {
    // const url = 'https://pokeapi.co/api/v2/pokemon';
    // const respuesta = await axios.get(url);

    // // Almaceno la lista en el estado lista
    // setLista(respuesta.data.results);

    // Llamar a mi BackEnd
    // Traer los datos 
    
    const url = 'http://localhost:3000/usuarios';

    // Podemos hacerlo con fetch:
    //const respuesta = await fetch(url);

    let respuesta = await fetch(url);

    if (respuesta.status === 200) {
      respuesta = await respuesta.json();
    
      setLista(respuesta);
    }

    // O podemos hacerlo con axios:
    //const respuesta = await axios.get(url);
    
  }

  useEffect(() => {
    cargarLista();
  }, []);

  return (
    <Card.Body>
      {/* Página de inicio...
      <br />

      <ul>
        {
          lista.map((item, key) => (
            <li key={key}>
              { item.name }
            </li>
          ))
        }
      </ul> */}

      <TablaDeDatos lista={lista} />

    </Card.Body>
  )
}

export default Inicio