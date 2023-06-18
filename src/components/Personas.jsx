import React from "react";
import "../style/personas.css"
import personas from "../imagenes/personas.png";

const Personas = () => {
    return (
        <main>
            <div className="back-2parte">
                <img src={personas} alt="" className="img"/>
                <p>Disfruta y vive!</p>
            </div>
        </main>
    );
};

export default Personas;