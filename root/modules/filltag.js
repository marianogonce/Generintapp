export function fillTag(clase, objeto, key) {
  let elementoExpedienteHTML = document.getElementsByClassName(clase);
  for (let i = 0; i < elementoExpedienteHTML.length; i++) {
    elementoExpedienteHTML[i].textContent = objeto[0][key][0];
  }
}
