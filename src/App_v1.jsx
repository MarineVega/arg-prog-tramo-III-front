import { Button, Alert } from 'react-bootstrap';

import { Contenedor } from './components/Contenedor.jsx'; 
import MyNavbar from './components/navBar.jsx';

function App() {
  const listaAlumnos = [
    { nombre: 'Agustín', apellido: 'Rolón' },
    { nombre: 'Betina', apellido: 'Perez' },
    { nombre: 'Rafael', apellido: 'López' },
  ];

  return (
    <>
      <MyNavbar />

      <p>Hola mundo</p>

      {
        listaAlumnos.map((alumno, posicion) => {
          const { nombre, apellido } = alumno;

          return (
            <Contenedor key={posicion} nombre={nombre} apellido={apellido} />
        )
        })
      }
       
      <Button variant="primary">Primary</Button>{' '}
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button>{' '}
      <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button>{' '}
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
    </>
  )
}

export default App
