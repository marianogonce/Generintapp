import { buscadorDeExpedientes } from "./buscadorExpedientes.js";
import { formateadorDeFecha } from "./formateadorDeFecha.js";

export function generadorDeVectorDeFacturas(
  id_expediente,
  vectorDeExpedientes
) {
  let expedientes = buscadorDeExpedientes(id_expediente, vectorDeExpedientes);
  expedientes = expedientes.map((a) => {
    return vectorDeExpedientes[a];
  });
  let VectorFacturas = [];
  for (let i = 0; i < expedientes.length; i++) {
    VectorFacturas.push({
      numero_factura: expedientes[i].numero_factura[0],
      periodo_inicio: formateadorDeFecha(
        expedientes[i].periodo_inicio[0].replace("T00:00:00", "")
      ),
      periodo_fin: formateadorDeFecha(
        expedientes[i].periodo_fin[0].replace("T00:00:00", "")
      ),
      importe: expedientes[i].importe,
    });
  }
  return VectorFacturas;
}
