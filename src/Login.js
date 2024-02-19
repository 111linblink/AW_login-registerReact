import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const proceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:8000/user/" + username)
                .then((res) => res.json())
                .then((resp) => {
                    if (Object.keys(resp).length === 0) {
                        toast.error('Ingrese un nombre de usuario válido.');
                    } else {
                        if (resp.password === password) {
                            toast.success('¡Inicio de sesión exitoso!');
                            sessionStorage.setItem('username', username);
                            sessionStorage.setItem('userrole', resp.role);
                            navigate('/');
                        } else {
                            toast.error('Por favor, ingrese credenciales válidas');
                        }
                    }
                })
                .catch((err) => {
                    toast.error('Error al iniciar sesión: ' + err.message);
                });
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Por favor, ingrese su nombre de usuario');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Por favor, ingrese su contraseña');
        }
        return result;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header" style={{ backgroundColor: '' }}>
                            <h2 className="text-center text-black">Iniciar Sesión</h2>
                        </div>
                        <div className="card-body" style={{ backgroundColor: '' }}>
                            <form onSubmit={proceedLogin}>
                                <div className="form-group">
                                    <label htmlFor="username" className="text-secondary text-black">Nombre de Usuario</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-secondary text-black">Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                                </div>
                            </form> 
                        </div>
                        <div className="card-footer" style={{ backgroundColor: '' }}>
                            <p className="text-secondary mb-0 text-black">¿Nuevo usuario? <Link to={'/register'} className="text-success">Crear una cuenta</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;