/**
 * Calcula el coste total de las entradas a partir del número de entradas
 * y de la exposición seleccionada. Se llama cuando hay cambios en el
 * número de entradas o en la exposición
 */
function costeTotal() {
    // Los console.log nos sirven para presentar la información por pantalla
    console.log("-----------función costeTotal");
    // Con let definimos variables, que nos sirven para almacenar de forma
    // temporal algún dato que queramos guardar. En este caso, el número
    // de entradas definido por el usuario
    let numeroEntradas = document.getElementById("numero").value;
    console.log("num entradas = " + numeroEntradas);
    // Se extrae la exposición seleccionada y, según cuál sea, se guarda
    // el valor del precio de cada entrada para el cálculo
    let costePorEntrada = 0;
    let valorExposicion = document.getElementById("exposicion").value;
    if (valorExposicion === "e1") {
        costePorEntrada = 8;
    } else if (valorExposicion === "e2") {
        costePorEntrada = 10;
    } else {
        costePorEntrada = 15;
    }
    console.log("coste por entrada = " + costePorEntrada);
    // Se calcula el coste de las entradas y se le añade el símbolo €
    let costeEntradas = (numeroEntradas * costePorEntrada) + " €";
    console.log("coste = " + costeEntradas);
    // Se busca el elemento con id="coste" y se le actualiza el coste
    // total de las entradas
    document.getElementById("coste").innerHTML = costeEntradas;
}


/**
 * Presenta la ventana modal con los datos que se han introducido en el formulario
 * @returns false para que no se actualice la página al efectuar la compra
 */
function comprar() {
    console.log("-----------función comprar");
    // Se actualizan los elementos de la ventana modal a partir de lo que el usuario
    // ha escrito en el formulario
    document.getElementById("nom").innerHTML = document.getElementById("nombre").value;
    document.getElementById("corr").innerHTML = document.getElementById("correo").value;
    document.getElementById("num").innerHTML = document.getElementById("numero").value;
    document.getElementById("ct").innerHTML = document.getElementById("coste").innerHTML;

    // En el caso de la exposición, según la exposición seleccionada, tendrá un nombre
    // u otro
    let valorExposicion = document.getElementById("exposicion").value;
    let nombreExposicion = "";
    if (valorExposicion === "e1") {
        nombreExposicion = "Exposición 1 - 8 €";
    } else if (valorExposicion === "e2") {
        nombreExposicion = "Exposición 2 - 10 €";
    } else {
        nombreExposicion = "Exposición 3 - 15 €";
    }
    document.getElementById("ex").innerHTML = nombreExposicion;

    // Se muestra la ventana modal cambiando el valor de su propiedad CSS display
    document.getElementById("modal").style.display = "flex";
    return false;
}

function cerrarVentana() {
    console.log("-----------función cerrarVentana");
    // Se oculta la ventana modal cambiando el valor de su propiedad CSS display
    document.getElementById("modal").style.display = "none";
}