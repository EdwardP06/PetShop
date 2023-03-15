export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = " ";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    };
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una mayúscula, un número y no puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo número de teléfono no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
    },
    direccion: {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 y 40 carácteres",
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 y 40 carácteres",
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch: "El estado debe contener entre 10 y 40 carácteres",
    },
};

const validadores = {
    nacimiento: input => validarNacimineto(input),
};


function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error =>{
        if(input.validity[error]){
            console.log(error);
            console.log(input.validity[error])
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    } )

    return mensaje
}

function validarNacimineto(input){
    const fechaCliente = new Date(input.value);
    mayorDeEdad(fechaCliente);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}