import { currencyFormat } from "./currencyFormat.js";

export function rowsGenerator(VectorFacturas) {
  let elemento = document.getElementById("tablebody");
  for (let i = 0; i < VectorFacturas.length; i++) {
    let fila = document.createElement("tr");
    elemento.appendChild(fila);
    let columnaNumero = document.createElement("td");
    columnaNumero.textContent = VectorFacturas[i].numero_factura;
    fila.appendChild(columnaNumero);
    let columnaPeriodo = document.createElement("td");
    columnaPeriodo.textContent =
      VectorFacturas[i].periodo_inicio + " al " + VectorFacturas[i].periodo_fin;
    fila.appendChild(columnaPeriodo);
    let columnaImporte = document.createElement("td");
    columnaImporte.textContent = `${currencyFormat(
      parseFloat(VectorFacturas[i].importe, 10)
    )}`;
    fila.appendChild(columnaImporte);
  }
}
