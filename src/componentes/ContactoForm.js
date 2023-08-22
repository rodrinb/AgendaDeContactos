import React, { useEffect, useState } from "react";


const initialForm = {
    id: null,
    name: "",
    phone:"",
};

export const ContactoForm = ({
    addContact,
    dataToEdit,
    setDataToEdit,
}) => {
    const [form, setForm] = useState (initialForm);

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm (initialForm);
        }
    }, [dataToEdit]);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (
            form.name.trim().length > 2 ||
            form.phone.trim().length > 2 
        ){
            if (form.id === null) {
                addContact(form);
            } 
            handleReset();
        }
    };

    const handleReset = () => {
        setForm(initialForm);
        setDataToEdit(null);
    };
    return(

        <div className="container4">

        <div className="container-3">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <form onSubmit = {handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Nombre"
                    autoComplete="off"
                    onChange={handleChange}
                    value={form.name} />
                    <label htmlFor="name"></label>
                </div>

                <div className="form-floating mb-3">
                    <input 
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Número de Teléfono"
                    autoComplete="off"
                    onChange={handleChange}
                    value={form.phone} />
                    <label htmlFor="phone"></label>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-12">                           
                            <button
                            type="submit"
                            className="btn btn-primary shadow-none">
                                <i className="bi bi-person-plus"></i>Agregar
                            </button>
                    </div>
                </div>
            </form>
        </div>
        </div>

        </div>
    
    );


};


