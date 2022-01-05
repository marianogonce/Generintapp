export function formateadorDeFecha(stringDeFecha) {
  let splitString = stringDeFecha.split("-");
  let aux = splitString[0];
  splitString[0] = splitString[2];
  splitString[2] = aux;
  let joinArray = splitString.join("/");
  return joinArray;
}
