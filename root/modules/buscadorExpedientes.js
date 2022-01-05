export function buscadorDeExpedientes(idDelTramite, vectorDeExpedientes) {
  let expedientesEncontrados = [];
  for (let i = 0; i < vectorDeExpedientes.length; i++) {
    if (idDelTramite == vectorDeExpedientes[i].tramite_id[0]) {
      expedientesEncontrados.push(i);
    }
  }
  return expedientesEncontrados;
}
