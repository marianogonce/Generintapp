export function montoTotalTramite(vectorExpedientesSeleccionados) {
  let acumulador = 0;
  for (let i = 0; i < vectorExpedientesSeleccionados.length; i++) {
    acumulador += parseFloat(vectorExpedientesSeleccionados[i].importe);
  }
  return acumulador;
}
