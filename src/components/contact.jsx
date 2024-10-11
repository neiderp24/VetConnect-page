import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";

// Estado inicial del formulario
const initialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export const Contact = (props) => {
  // Definición del estado del formulario
  const [{ name, email, phone, message }, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Maneja el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    validateInput(e);
  };

  // Limpiar estado del formulario
  const clearState = () => setState({ ...initialState });

  // Validaciones de los inputs
  const validateInput = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorMsg = "Correo electrónico inválido.";
      }
    } else if (name === "phone") {
      const phonePattern = /^[0-9]+$/;
      if (!phonePattern.test(value)) {
        errorMsg = "Solo se permiten números.";
      }
    } else if (name === "name" && value.trim().length === 0) {
      errorMsg = "El nombre no puede estar vacío.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya errores
    if (Object.values(errors).some((error) => error)) {
      return;
    }

    // Crea un objeto con los datos del formulario
    const templateParams = {
      name,
      email,
      phone,
      message,
    };

    emailjs
      .send(
        "service_1kzu9zg", // tu service ID
        "template_30s1ba5", // tu template ID
        templateParams,
        "xqBgONgHwRCse70qV" // tu user ID
      )
      .then(
        (result) => {
          console.log("Correo enviado: ", result.text);
          setSuccess(true); // Indicar éxito en el envío
          clearState(); // Limpiar formulario después del envío
        },
        (error) => {
          console.log("Error al enviar: ", error.text);
        }
      );
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Ponte en contacto</h2>
                <p>
                  Complete el siguiente formulario para enviarnos un correo
                  electrónico y nos comunicaremos con usted lo antes posible.
                </p>
              </div>
              <form name="sentMessage" validate="true" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control ${
                          errors.name ? "is-invalid" : success ? "is-valid" : ""
                        }`}
                        placeholder="Nombre"
                        required
                        value={name}
                        onChange={handleChange}
                      />
                      {/* No mostrar mensajes de validación personalizados */}
                      <div className="invalid-feedback">{errors.name}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : success ? "is-valid" : ""
                        }`}
                        placeholder="Correo electrónico"
                        required
                        value={email}
                        onChange={handleChange}
                      />
                      {/* No mostrar mensajes de validación personalizados */}
                      <div className="invalid-feedback">{errors.email}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className={`form-control ${
                          errors.phone ? "is-invalid" : success ? "is-valid" : ""
                        }`}
                        placeholder="Teléfono"
                        required
                        value={phone}
                        onChange={handleChange}
                      />
                      {/* No mostrar mensajes de validación personalizados */}
                      <div className="invalid-feedback">{errors.phone}</div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Mensaje"
                    required
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Información de contacto</h3>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Teléfono
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Correo electrónico
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>&copy; 2024 Vetconnect</p>
        </div>
      </div>
    </div>
  );
};
