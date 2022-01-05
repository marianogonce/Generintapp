var expedientesARenderizar = [];
var expedienteATramitar;

function seleccionarExpediente(tramite, id) {
  if (expedienteATramitar) {
    advertenciaElemento = document.getElementById("advertencia");
    if (expedienteATramitar === id) {
      advertenciaElemento.textContent = "El trámite ya está seleccionado";
      setTimeout(quitarAlerta, 1500);
    } else {
      advertenciaElemento.textContent = "Hay otro trámite seleccionado";
      setTimeout(quitarAlerta, 1500);
    }
  } else {
    expedienteATramitar = `${id}`;
    let elementoSeleccionado = document.getElementById(id);
    elementoSeleccionado.style = "font-weight: bold";
    elementoSeleccionado.className = "seleccionado";
    elementosDescartados = document.getElementsByClassName("no_seleccionado");
    for (i = elementosDescartados.length - 1; i >= 0; i--) {
      elementosDescartados[i].style = "color: grey";
      elementosDescartados[i].className = "descartado";
    }
    const li = document.createElement("li");
    li.textContent = tramite;
    li.id = `${id}seleccionado`;
    li.className = "seleccionado";
    //li.onlclick
    li.addEventListener("click", () => {
      removerSeleccionTramite(li.id);
    });
    ulTramiteSeleccionado = document.getElementById("tramite_seleccionado");
    ulTramiteSeleccionado.appendChild(li);
    visibilidadBoton(
      true,
      "PasePresupuesto",
      "Pase a presupuesto",
      "presupuesto.html"
    );
    visibilidadBoton(
      true,
      "ActoAdmnistrativo",
      "Acto Administrativo",
      "acto_administrativo.html"
    );
    visibilidadBoton(true, "PaseJuridico", "Pase a Jurídico", "juridico.html");
    visibilidadBoton(
      true,
      "RemisionFirma",
      "Remisión a la firma",
      "remision.html"
    );
    visibilidadBoton(true, "PaseDGA", "Pase a la DGA", "dga.html");
    console.log(expedientesARenderizar);
    console.log(expedienteATramitar);
  }
}

function quitarAlerta() {
  advertenciaElemento = document.getElementById("advertencia");
  advertenciaElemento.textContent = "";
}

function removerSeleccionTramite(id) {
  elementoSeleccionado = document.getElementsByClassName("seleccionado");
  elementoSeleccionado[0].style = "font-weight:";
  elementoSeleccionado[0].className = "no_seleccionado";
  elementosDescartados = document.getElementsByClassName("descartado");
  for (i = elementosDescartados.length - 1; i >= 0; i--) {
    elementosDescartados[i].style = "color:";
    elementosDescartados[i].className = "no_seleccionado";
  }
  elemento = document.getElementById(id).remove();
  visibilidadBoton(false, "PasePresupuesto");
  visibilidadBoton(false, "ActoAdmnistrativo");
  visibilidadBoton(false, "PaseJuridico");
  visibilidadBoton(false, "RemisionFirma");
  visibilidadBoton(false, "PaseDGA");
  expedienteATramitar = 0;
  elementoIfram = document.getElementById("inlineFrame");
  elementoIfram.src = "blank.html";
}

function visibilidadBoton(actividad, id, textContent = null, source = null) {
  elemento = document.getElementById(id);
  if (actividad) {
    elemento.textContent = textContent;
    elemento.style.display = "inline";
    elemento.addEventListener("click", () => {
      GenerarDocumento(source);
    });
  } else {
    elemento.style.display = "none";
    elemento.textContent = "";
  }
}

function GenerarDocumento(source) {
  axios
    .get(`http://localhost:3001/tramites/actual/${expedienteATramitar}`)
    .then((response) => {})
    .catch((error) => console.error(error));
  elemento = document.getElementById("inlineFrame");
  elemento.src = source;
  elemento.style.display = "inline";
}

const createLi = (tramite) => {
  const li = document.createElement("li");
  li.textContent = `${tramite.numero_expediente[0]}`;
  li.id = tramite.tramite_id[0];
  li.className = "no_seleccionado";
  li.addEventListener("click", () => {
    seleccionarExpediente(li.textContent, li.id);
  });
  return li;
};

const appendToDOM = (tramites) => {
  const ul = document.querySelector("ul");
  if (ul != undefined) {
    tramites.map((tramite) => {
      if (!expedientesARenderizar.includes(tramite.tramite_id[0])) {
        expedientesARenderizar.push(tramite.tramite_id[0]);
        ul.appendChild(createLi(tramite));
      }
    });
  }
};

const fetchTramites = () => {
  axios
    .get("http://localhost:3001/tramites")
    .then((response) => {
      const tramites = response.data;
      console.log(`GET list tramites`, tramites);
      // append to DOM
      appendToDOM(tramites);
    })
    .catch((error) => {
      advertenciaElemento = document.getElementById("advertencia");
      advertenciaElemento.textContent = error;
      console.error(error);
    });
};

fetchTramites();
