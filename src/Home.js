import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center">¡Bienvenido a nuestra página de inicio!</h1>
                            <div className="text-center mt-4">
                                <Link to="/login" className="btn btn-primary">Salir</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;