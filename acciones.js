document.addEventListener("DOMContentLoaded", function () {
    // Obtén referencias a los elementos HTML que necesitas
    const nombreInput = document.getElementById("nombre");
    const apPatInput = document.getElementById("apPat");
    const apMatInput = document.getElementById("apMat");
    const fechaInput = document.getElementById("fecha");
    const generarBtn = document.getElementById("generar");
    const rfcInput = document.getElementById("resultadoFinal");
    const limpiarBtn = document.getElementById("limpiar");
    const nUsuP = document.getElementById("nUsu");
    const emailUsuP = document.getElementById("emailUsu");
    const idUsuInput = document.getElementById("idusu");
    const selectUsuBtn = document.getElementById("selectUsu");
    const cleanBtn = document.getElementById("clean");

    // Agrega un evento de clic al botón "GENERAR"
    generarBtn.addEventListener("click", function () {
        const nombre = nombreInput.value.trim().toUpperCase();
        const apPat = apPatInput.value.trim().toUpperCase();
        const apMat = apMatInput.value.trim().toUpperCase();
        const fecha = fechaInput.value;

        if (nombre === "" || apPat === "" || apMat === "" || fecha === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        rfcInput.value = calcularRFC(nombre, apPat, apMat, fecha);
    });

    // Agrega un evento de clic al botón "LIMPIAR"
    limpiarBtn.addEventListener("click", limpiarCampos);

    // Agrega un evento de clic al botón "BUSCAR"
    selectUsuBtn.addEventListener("click", function () {
        const idUsuario = idUsuInput.value;
        fetch("https://jsonplaceholder.typicode.com/users/" + idUsuario)
            .then(response => response.json())
            .then(data => mostrarDatosUsuario(data))
            .catch(error => manejarError(error));
    });

    // Agrega un evento de clic al botón "LIMPIAR" (API)
    cleanBtn.addEventListener("click", limpiarDatosUsuario);

    // Función para calcular el RFC
    function calcularRFC(nombre, apPat, apMat, fecha) {
        return `${apPat.substring(0, 2)}${apMat.charAt(0)}${nombre.charAt(0)}${fecha.substring(2, 4)}${fecha.substring(5, 7)}${fecha.substring(8, 10)}`;
    }

    // Función para limpiar los campos de entrada
    function limpiarCampos() {
        const campos = [nombreInput, apPatInput, apMatInput, fechaInput, rfcInput];
        campos.forEach(cam => cam.value = "");
        limpiarDatosUsuario();
    }

    // Función para mostrar los datos del usuario
    function mostrarDatosUsuario(data) {
        nUsuP.textContent = data.name || "(No encontrado)";
        emailUsuP.textContent = data.email || "(No encontrado)";
    }

    // Función para manejar errores de la API
    function manejarError(error) {
        nUsuP.textContent = "(No encontrado)";
        emailUsuP.textContent = "(No encontrado)";
        alert(error.message);
    }

    // Función para limpiar los datos del usuario
    function limpiarDatosUsuario() {
        nUsuP.textContent = "";
        emailUsuP.textContent = "";
        idUsuInput.value = "";
    }
});
