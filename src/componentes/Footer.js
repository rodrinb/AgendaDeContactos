import React from "react";


export const Footer = () => {
    return(
    <footer className="navbar fixed-bottom text-black footer">
        <div className="container d-flex justify-content-center">
            <span>
                 <b>Rodri {new Date().getFullYear()} </b>
            </span>
        </div>
    </footer>
    );
};