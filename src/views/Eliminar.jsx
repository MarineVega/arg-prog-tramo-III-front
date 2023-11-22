import { useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useEffect } from 'react';

const Eliminar = () => {    
    const [error, setError] = useState(false);
    const [desHabilitarBoton, setDesHabilitarBoton] = useState(false);
    
    const navigate = useNavigate();
    const { id } = useParams();

    const volver = () => {
        navigate('/');
    }

    const eliminar = async () => {
        setError(false);
        setDesHabilitarBoton (true);   

        try {
            const url = 'http://localhost:3000/usuario';
            const respuesta = await axios.delete(url, { data: { id: id } });

            if (respuesta.status === 200) {
                return navigate('/');
            } else {
                setError('Ocurrió un error inesparado');
            }
        } catch (error) {
            setError('Ocurrió un error inesparado');
        }

        setDesHabilitarBoton (false);
    }

    // Esto lo uso para probar, así puedo ver el id en consola
    // useEffect(() => {
    //     console.log(id)
    // }, [])

    return (
        <Card.Body>
            <Alert variant="warning">
                ¿Está seguro que desea eliminar el usuario con ID {id}?
            </Alert>

            {
                error && (
                    <Alert variant="danger">
                        { error }
                    </Alert>
                )
            }

            <ButtonGroup aria-label="Basic example" style={{ maxWidth: '30px' }}>
                <Button variant="primary" onClick={volver} disabled={desHabilitarBoton}>
                    Volver
                </Button>
                <Button variant="danger" onClick={eliminar} disabled={desHabilitarBoton}>
                    Eliminar
                </Button>
            </ButtonGroup>

        </Card.Body>
    )
}

export default Eliminar