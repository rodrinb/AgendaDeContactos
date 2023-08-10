import React, { useEffect, useState } from "react";
import { ContactoForm } from "../ContactoForm";
import Swal from "sweetalert2";

export const Index = () => {
  const [contactData, setContactData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const [key, setSearchKey] = useState("");

  useEffect(() => {
    let getContacts = localStorage.getItem("contacts");
    setContactData(JSON.parse(getContacts));
  }, []);

  const addContact = (data) => {
    if (
      !contactData.find((c) => c.name.toLowerCase() === data.name.toLowerCase())
    ) {
      data.id = Date.now();
      setContactData([...contactData, data]);
      localStorage.setItem("contacts", JSON.stringify(contactData));
      Swal.fire({
        title: "Contacto guardado!",
        icon: "success",
        confirmButtonColor: "#9bc59d",
      });
    }
  };

  const updateContact = () => {
    const updatedContacts = contactData.map((contact) =>
      contact.id === dataToEdit.id ? dataToEdit : contact
    );
    setContactData(updatedContacts);
    setShowEdit(false);
    Swal.fire({
      title: "Contacto actualizado!",
      icon: "success",
      confirmButtonColor: "#9bc59d",
    });
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };
  const deleteContact = (id) => {
    const deletedContacts = contactData.filter((contact) => contact.id !== id);
    setContactData(deletedContacts);
    Swal.fire({
      title: "Contacto eliminado!",
      icon: "success",
      confirmButtonColor: "#9bc59d",
    });
    localStorage.setItem("contacts", JSON.stringify(deletedContacts));
  };

  const searchContact = (key) => {
    if (key) {
      const searched = contactData.filter((item) => item.name === key);
      setContactData(searched);
      setShowClear(true);
      console.log(searched);
    }
  };

  return (
    
    <div className="container mt-5 mb-5">
      <div className="row">
        <ContactoForm addContact={addContact} setDataToEdit={setDataToEdit} />
      </div>
      <div style={{ marginTop: "30px" }}>
        <input
          placeholder="Ingrese un nombre"
          onChange={(e) => setSearchKey(e.target.value)}
        className="input-nombre"></input>

        {showClear ? (
          <button onClick={() => window.location.reload()}>X</button>
        ) : (
          
          <button onClick={() => searchContact(key)} className="boton-buscar"> Buscar </button>

        )}
        </div>
      

      {/* CONTACTOS */}
      <div className="container-2">
      {contactData.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <button
            onClick={() => {
              setDataToEdit(item);
              setShowEdit(true);
            }}
          className="mostrar-contacto">
            Mostrar Contacto
          </button>
          <button onClick={() => deleteContact(item.id)} className="eliminar-contacto">Eliminar</button>
        </div>
        
        
      ))}
     </div>


      {/* FORM TO EDIT */}

      {showEdit ? (
        <div className="div-editar">
          <h1>Editar Contacto</h1>
          <input
            type="text"
            value={dataToEdit.name}
            onChange={(e) =>
              setDataToEdit({ ...dataToEdit, name: e.target.value })
            }
          className="input1"></input>
          <input
            type="text"
            value={dataToEdit.phone}
            onChange={(e) =>
              setDataToEdit({ ...dataToEdit, phone: e.target.value })
            }
          className="input2"></input>
          <button onClick={() => setShowEdit(false)} className="volver">Volver</button>
          <button onClick={updateContact} className="confirmar">Confirmar</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
