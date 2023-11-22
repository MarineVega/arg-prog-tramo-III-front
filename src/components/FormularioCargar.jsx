import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormularioCargar = () => {
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
        if (nombre.length === 0){
            //setErrores({ nombre: 'Debe ingresar al menos un nombre' });
            misErrores.nombre = 'Debe ingresar al menos un nombre.';
        }

        if (apellido.length === 0){           
                //setErrores({ nombre: 'Debe ingresar al menos un apellido' });
                misErrores.apellido = 'Debe ingresar al menos un apellido.';
            }            
        
        setErrores(misErrores);

        // // Con ésas líneas valida uno por uno los datos
        // console.log(!errores.hasownProperty('nombre'))
        // console.log(!errores.hasownProperty('apellido'))


        // Con este if pregunto por todo el objeto de errores en genral, si ninguno tiene error, es decir, el tamaño es 0
        if (Object.entries(misErrores).length === 0) {
            setDesHabilitarBoton (true);

            console.log(nombre);
            console.log(apellido); 

            await mandarDatos();
        }
    }

    // useEffect(() => {
    //     console.log('Se cambió el valor del email');
    // }, [email]);

    // useEffect(() => {
    //     realizarLogin();
    // }, []);

    const mandarDatos = async () => {
        const url = 'http://localhost:3000/usuario';

        const datos = {
            nombre: nombre,
            apellido: apellido,
        }

        try {
            const respuesta = await axios.post(url, datos);

            if (respuesta.status === 200) {
                return navigate('/');
            } else {
                setErrores({ error: 'Ocurrió un error inesperado.' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrió un error inesperado.' });
        };
        

        setDesHabilitarBoton (false);
    }


    return (
        
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Nombre
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarNombre} />
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
                    <Form.Control type="text" onInput={cambiarApellido}/>
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
                Cargar Datos            
            </Button>

            {/* {
                desHabilitarBoton ? ' Enviando datos...' : 'Datos no enviados'
            } */}
        </Form>
     );
}

export default FormularioCargar;

// return (
        
//     <Form>
//         <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
//             <Form.Label column sm="2">
//                 Email
//             </Form.Label>
//             <Col sm="10">
//                 <Form.Control type="email" placeholder="email@example.com" onInput={cambiarEmail} />
//             </Col>
//         </Form.Group>

//         <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
//             <Form.Label column sm="2">
//                 Contraseña
//             </Form.Label>
//             <Col sm="10">
//                 <Form.Control type="password" placeholder="Contraseña" onInput={cambiarPasword}/>
//             </Col>
//         </Form.Group>

//         <Button variant="primary" onClick={realizarLogin}>Ingresar</Button>{' '}
//     </Form>
//  );