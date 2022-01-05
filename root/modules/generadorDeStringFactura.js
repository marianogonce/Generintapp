function generadorStringFacturaPeriodo(VectorFacturas) {
  let string = "";
  for (let i = 0; i < VectorFacturas.length; i++) {
    if (VectorFacturas.length === 0 || i === VectorFacturas.length - 1) {
      string =
        string +
        ` ${VectorFacturas[i].periodo_inicio} al ${VectorFacturas[i].periodo_fin}`;
    } else {
      if (i === VectorFacturas.length - 2) {
        string =
          string +
          ` ${VectorFacturas[i].periodo_inicio} al ${VectorFacturas[i].periodo_fin} y del`;
      } else {
        string =
          string +
          ` ${VectorFacturas[i].periodo_inicio} al ${VectorFacturas[i].periodo_fin},`;
      }
    }
  }

  let objeto = [{ stringFactura: [string] }];
  return objeto;
}

function generadorStringFacturaNumero(VectorFacturas) {
  let string = "";
  for (let i = 0; i < VectorFacturas.length; i++) {
    if (VectorFacturas.length === 0 || i === VectorFacturas.length - 1) {
      string = string + ` ${VectorFacturas[i].numero_factura}`;
    } else {
      if (i === VectorFacturas.length - 2) {
        string = string + ` ${VectorFacturas[i].numero_factura} y `;
      } else {
        string = string + ` ${VectorFacturas[i].numero_factura},`;
      }
    }
  }

  let objeto = [{ stringFactura: [string] }];
  return objeto;
}

export { generadorStringFacturaPeriodo, generadorStringFacturaNumero };
