import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { traerDatosDeUsuarioPorID } from './../utils/llamados.js';

const Ver = () => {
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const traerDatos = async () => {
        const respuesta = await traerDatosDeUsuarioPorID(id);

        console.log(respuesta)

        if (respuesta) {
            setNombre(respuesta.nombre);
            setApellido(respuesta.apellido);
        } else {
            console.log('No se encontró un usuario con el id ' + id);
        }
    }
  
    useEffect(() => {
        traerDatos();
    }, []);

    return(
        <Card.Body>
           <Card>
                <Card.Body>
                    <Card.Title>{ nombre } { apellido }</Card.Title>
                    <Card.Text>
                        Este usuario tiene el ID { id }
                    </Card.Text>
                    <Button variant="primary">
                        Editar    
                    </Button>
                </Card.Body>
           </Card>
       
        <br />
        
            <Card>
                <Card.Body>
                    <Card.Title>Comentarios</Card.Title>          
                    <Card.Body>

                        <Card>
                            <Card.Body>
                                <Card.Title>Usuario</Card.Title>
                                <Card.Text>
                                    Este es un comentario
                                </Card.Text>
                                <Button variant="primary">
                                    Editar Comentarios
                                </Button>
                                <Button variant="danger">
                                    Eliminar Comentarios    
                                </Button>
                            </Card.Body>            
                        </Card>

                        {
                            [...Array(5)].map((item, key) => (
                                <div key={key}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Usuario</Card.Title>
                                            <Card.Text>
                                                Este es un comentario
                                            </Card.Text>
                                            <Button variant="primary">
                                                Editar Comentarios
                                            </Button>
                                            <Button variant="danger">
                                                Eliminar Comentarios    
                                            </Button>
                                        </Card.Body>            
                                    </Card>
                                    <br />
                                </div>
                            ))
                        }

                    </Card.Body>
                </Card.Body>            
            </Card>                  
        </Card.Body>

    );
}

export default Ver;