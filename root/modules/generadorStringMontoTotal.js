import { NumeroALetras } from "./NumeroALetras.js";
import { montoTotalTramite } from "./montoTotalTramite.js";
import { generadorDeVectorDeFacturas } from "./generadorDeVectorDeFacturas.js";
import { currencyFormat } from "./currencyFormat.js";

export function generadorStringMontoTotal(vectorDeExpedientesSeleccionados) {
  let montoEnLetras = NumeroALetras(
    montoTotalTramite(
      generadorDeVectorDeFacturas(
        vectorDeExpedientesSeleccionados[0].tramite_id[0],
        vectorDeExpedientesSeleccionados
      )
    )
  );
  let montoEnNumeros = currencyFormat(
    montoTotalTramite(
      generadorDeVectorDeFacturas(
        vectorDeExpedientesSeleccionados[0].tramite_id[0],
        vectorDeExpedientesSeleccionados
      )
    )
  );

  return [{ cadenaMontoTotal: [`${montoEnLetras} (${montoEnNumeros}.-)`] }];
}
