import { fillTag } from "./modules/filltag.js";
import { formateadorDeFecha } from "./modules/formateadorDeFecha.js";
import { generadorDeVectorDeFacturas } from "./modules/generadorDeVectorDeFacturas.js";
import {
  generadorStringFacturaPeriodo,
  generadorStringFacturaNumero,
} from "./modules/generadorDeStringFactura.js";
import { generadorStringMontoTotal } from "./modules/generadorStringMontoTotal.js";

function popularPlantillaJuridicos() {
  axios
    .get(`http://localhost:3001/tramiteactual`)
    .then(async (response) => {
      const vectorDeExpedientesSeleccionados = await response.data;
      console.log(
        `GET list tramite a Tramitar`,
        vectorDeExpedientesSeleccionados
      );
      fillTag(
        "numero_expediente",
        vectorDeExpedientesSeleccionados,
        "numero_expediente"
      );
      fillTag(
        "nombre_proveedor",
        vectorDeExpedientesSeleccionados,
        "nombre_proveedor"
      );
      let stringFacturaPeriodo = generadorStringFacturaPeriodo(
        generadorDeVectorDeFacturas(
          vectorDeExpedientesSeleccionados[0].tramite_id[0],
          vectorDeExpedientesSeleccionados
        )
      );
      let stringFacturaNumero = generadorStringFacturaNumero(
        generadorDeVectorDeFacturas(
          vectorDeExpedientesSeleccionados[0].tramite_id[0],
          vectorDeExpedientesSeleccionados
        )
      );

      let estructuraMontoTotal = generadorStringMontoTotal(
        vectorDeExpedientesSeleccionados
      );

      fillTag("total_expediente", estructuraMontoTotal, "cadenaMontoTotal");
      fillTag("periodos_factura", stringFacturaPeriodo, "stringFactura");
      fillTag("numero_factura", stringFacturaNumero, "stringFactura");
      fillTag("cuit", vectorDeExpedientesSeleccionados, "cuit");
      fillTag("area_requirente", vectorDeExpedientesSeleccionados, "autor");
      fillTag(
        "tipo_informe_fundante",
        vectorDeExpedientesSeleccionados,
        "tipo_documento"
      );
      fillTag(
        "gde_informe_fundante",
        vectorDeExpedientesSeleccionados,
        "numero_gde"
      );
      fillTag("objeto_tramite", vectorDeExpedientesSeleccionados, "objeto");
      fillTag(
        "oc_antecedente",
        vectorDeExpedientesSeleccionados,
        "GenerInt_source.oc_antecedente.numero_oc"
      );
      fillTag(
        "proveedor_antecedente",
        vectorDeExpedientesSeleccionados,
        "nombre_proveedor"
      );
      vectorDeExpedientesSeleccionados[0].vencimiento[0] = formateadorDeFecha(
        vectorDeExpedientesSeleccionados[0].vencimiento[0].replace(
          "T00:00:00",
          ""
        )
      );
      fillTag(
        "fecha_vencimiento_oc_antecedente",
        vectorDeExpedientesSeleccionados,
        "vencimiento"
      );
      fillTag(
        "expediente_proceso_regularizador",
        vectorDeExpedientesSeleccionados,
        "expediente"
      );
      fillTag(
        "numero_proceso_regularizador",
        vectorDeExpedientesSeleccionados,
        "numero_pc"
      );
      fillTag(
        "estado_proceso_regularizador",
        vectorDeExpedientesSeleccionados,
        "estado_procedimiento"
      );
      let cantidadDeFactura = generadorDeVectorDeFacturas(
        vectorDeExpedientesSeleccionados[0].tramite_id[0],
        vectorDeExpedientesSeleccionados
      );
      let tagCantidadFacturas;
      if (cantidadDeFactura.length == 1) {
        tagCantidadFacturas =
          document.getElementsByClassName("cantidad_factura");
        for (let i = 0; i < tagCantidadFacturas.length; i++) {
          tagCantidadFacturas[i].textContent = "la factura";
        }
      } else {
        tagCantidadFacturas =
          document.getElementsByClassName("cantidad_factura");
        for (let i = 0; i < tagCantidadFacturas.length; i++) {
          tagCantidadFacturas[i].textContent = "las facturas";
        }
      }
      let anio = new Date().getFullYear();
      let intervencion = (document.getElementsByClassName(
        "anio_actual"
      )[0].textContent = anio.toString());
    })
    .catch((error) => console.error(error));
}

try {
  popularPlantillaJuridicos();
} catch {
  console.log("No hay expediente actual");
}
