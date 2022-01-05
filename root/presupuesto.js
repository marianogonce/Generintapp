import { fillTag } from "./modules/filltag.js";
import { formateadorDeFecha } from "./modules/formateadorDeFecha.js";
import { generadorDeVectorDeFacturas } from "./modules/generadorDeVectorDeFacturas.js";
import {
  generadorStringFacturaPeriodo,
  generadorStringFacturaNumero,
} from "./modules/generadorDeStringFactura.js";
import { rowsGenerator } from "./modules/rowsGenerator.js";

function popularPlantillaPresupuesto() {
  axios
    .get(`http://localhost:3001/tramiteactual`)
    .then(async (response) => {
      const vectorDeExpedientesSeleccionados = await response.data;
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
      fillTag("periodos_factura", stringFacturaPeriodo, "stringFactura");
      fillTag("numero_factura", stringFacturaNumero, "stringFactura");
      rowsGenerator(
        generadorDeVectorDeFacturas(
          vectorDeExpedientesSeleccionados[0].tramite_id[0],
          vectorDeExpedientesSeleccionados
        )
      );
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
      let parrafoAntecedente;
      if (
        vectorDeExpedientesSeleccionados[0].estado_procedimiento[0] ==
        "Adjudicado"
      ) {
        parrafoAntecedente = document.getElementById("parrafo_antecedente");
        vectorDeExpedientesSeleccionados[0].perfeccionamiento_oc[0] =
          formateadorDeFecha(
            vectorDeExpedientesSeleccionados[0].perfeccionamiento_oc[0].replace(
              "T00:00:00",
              ""
            )
          );
        parrafoAntecedente.textContent =
          parrafoAntecedente.textContent +
          ` En efecto, producto de dicho procedimiento se perfeccionó la Orden de Compra N° ${vectorDeExpedientesSeleccionados[0]["GenerInt_source.pc_regularizador.numero_oc"][0]} en fecha ${vectorDeExpedientesSeleccionados[0].perfeccionamiento_oc[0]}.`;
      }
      let cantidadDeFactura = generadorDeVectorDeFacturas(
        vectorDeExpedientesSeleccionados[0].tramite_id[0],
        vectorDeExpedientesSeleccionados
      );
      let tagCantidadFacturas;
      if (cantidadDeFactura.length == 1) {
        tagCantidadFacturas =
          document.getElementsByClassName("cantidad_factura");
        for (let i = 0; i < tagCantidadFacturas.length; i++) {
          tagCantidadFacturas[i].textContent = "la Factura N°";
        }
      } else {
        tagCantidadFacturas =
          document.getElementsByClassName("cantidad_factura");
        for (let i = 0; i < tagCantidadFacturas.length; i++) {
          tagCantidadFacturas[i].textContent = "las Facturas Nros.";
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
  popularPlantillaPresupuesto();
} catch {
  console.log("No hay expediente actual");
}
