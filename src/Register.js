import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id.trim() || !name.trim() || !password.trim() || !confirmPassword.trim()) {
            toast.error('Por favor completa todos los campos.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }
        const regobj = { id, name, password };
        fetch("http://localhost:8000/user", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regobj)
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Error al registrar.');
            }
            toast.success('¡Usuario registrado exitosamente!');
            navigate('/login');
        }).catch((err) => {
            toast.error('Error al registrar: ' + err.message);
        });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header ">
                            <h2 className="text-center text-black">Registro</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="id" className="text-secondary text-black">Nombre de Usuario</label>
                                    <input
                                        id="id"
                                        className="form-control"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                    {!id.trim() && <p className="errmsg">El nombre de usuario es obligatorio.</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-secondary text-black">Contraseña</label>
                                    <div className="input-group">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-link"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? "Ocultar" : "Mostrar"}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword" className="text-secondary text-black">Confirmar Contraseña</label>
                                    <div className="input-group">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-link"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? "Ocultar" : "Mostrar"}
                                        </button>
                                    </div>
                                    {password !== confirmPassword && <p className="errmsg">Las contraseñas no coinciden.</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="text-secondary text-black">Nombre Completo</label>
                                    <input
                                        id="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {!name.trim() && <p className="errmsg">El nombre completo es obligatorio.</p>}
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Registrarse</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <p className="text-secondary mb-0 text-black">¿Ya tienes una cuenta? <Link to={'/login'} className="text-success">Iniciar Sesión</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

