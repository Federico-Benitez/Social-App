module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "El nombre de usuario no puede estar vacio";
  }
  if (email.trim() === "") {
    errors.email = "El email no puede estar vacio";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "El email ingresado no es valido";
    }
  }
  if (password === "") {
    errors.password = "Es necesario ingresar una contraseña";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no son iguales";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1 // Boleano por si existe algun error
  };
};
