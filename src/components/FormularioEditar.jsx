import { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { traerDatosDeUsuarioPorID } from './../utils/llamados.js';

const FormularioEditar = (props) => {
    const { id } = props;
    const url = 'http://localhost:3000/usuario';

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [desHabilitarBoton, setDesHabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});
    
    const navigate = useNavigate();

    const cambiarNombre = (e) => {
        setNombre(e.target.value);
    }

    const cambiarApellido = (e) => {
        setApellido(e.target.value);
    }

    const verificarDatos = async () => {
        let misErrores = {}

        // Pregunto si nombre está vacío
        if (nombre.length === 0) {
            misErrores.nombre = 'Debe ingresar al menos un nombre.';
        }

        if (apellido.length === 0) {           
                misErrores.apellido = 'Debe ingresar al menos un apellido.';
            }            
        
        setErrores(misErrores);

        // Con este if pregunto por todo el objeto de errores en genral, si ninguno tiene error, es decir, el tamaño es 0
        if (Object.entries(misErrores).length === 0) {
            setDesHabilitarBoton (true);

            console.log(nombre);
            console.log(apellido); 

            await mandarDatos();
        }
    }
        
    const mandarDatos = async () => {
        const datos = {
            id: id,
            nombre: nombre,
            apellido: apellido,
        }
        
        try {
            const respuesta = await axios.put(url, datos);

            if (respuesta.status === 200) {
                return navigate('/');
            } else {
                setErrores({ error: 'Ocurrió un error inesperado 1.' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrió un error inesperado 2.' });
        }

        setDesHabilitarBoton (false);
    }

    const traerDatos = async () => {
        const respuesta = await traerDatosDeUsuarioPorID(id);

        if (respuesta) {
            setNombre(respuesta.nombre);
            setApellido(respuesta.apellido);
        } else {
            setErrores({ error: 'Ocurrió un error inesperado al intentar obtener el usuario.' });
            setDesHabilitarBoton (true);
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);

    // const traerDatos = async () => {
    //     const endpoint = url + '/' + id; 

    //     try {
    //         const respuesta = await axios.get(endpoint);

    //         if (respuesta.status === 200) {
    //             const usuario = respuesta.data;

    //             setNombre(usuario.nombre);
    //             setApellido(usuario.apellido);
    //         } else {
    //             setErrores({ error: 'Ocurrió un error inesperado. No se pudo obtener el usuario.' });
    //             setDesHabilitarBoton (true);
    //         }
    //     } catch (error) {
    //         setErrores({ error: 'Ocurrió un error inesperado al intentar obtener el usuario.' });
    //         setDesHabilitarBoton (true);
    //     }
    // }
    // useEffect(() => {
    //     traerDatos();
    // }, []);

   

    return (
        
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Nombre
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarNombre} defaultValue={nombre} />
                    {
                        errores.nombre && (
                            <span style={{ color: 'red' }}>
                                {errores.nombre}
                            </span>
                        )
                    }                    
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                    Apellido
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarApellido} defaultValue={apellido} />
                    {
                        errores.apellido && (
                            <span style={{ color: 'red' }}>
                                {errores.apellido}
                            </span>
                        )
                    }     
                </Col>
            </Form.Group>
            
            {
                errores.error && (
                    <Alert variant="warning">
                        {errores.error}
                    </Alert>
                )
            }

            <Button variant="primary" onClick={verificarDatos} disabled={desHabilitarBoton}>
                Editar Datos            
            </Button>
        </Form>
     );
}

export default FormularioEditar;
