const express = require("express");
const app = express();
const path = require("path");
const { app: apps, BrowserWindow } = require("electron");
const fs = require("fs");
const xml2js = require("xml2js");
const port = 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());

var consulta;
var actual;

var urlConsulta = "./Consulta/GenerInt_source.xml";

try {
  let consultaXml = fs.readFileSync(urlConsulta, {
    encoding: "utf-8",
  });

  xml2js.parseString(consultaXml, { mergeAttrs: true }, (err, result) => {
    if (err) {
      throw err;
    }
    let { GenerInt_source } = result.dataroot;
    consulta = GenerInt_source;
  });

  function buscador(id_expediente_buscado, consulta) {
    let expedientes = [];
    for (i = 0; i < consulta.length; i++) {
      if (id_expediente_buscado == consulta[i].tramite_id[0]) {
        expedientes.push(i);
      }
    }
    return expedientes;
  }

  app.get("/tramites", async (req, res) => {
    try {
      let resultado = consulta;
      if (resultado.length > 0) {
        res.send(resultado);
      } else {
        throw { codigo: 404, mensaje: "No hay expedientes" };
      }
    } catch (error) {
      if (error.codigo) {
        res.status(error.codigo).send(error.mensaje);
      } else {
        res.status(500).send("Error inesperado");
      }
    }
  });

  app.get("/tramites/actual/:id", async (req, res) => {
    try {
      let resultado = await buscador(req.params.id, consulta);
      actual = resultado.map((a) => {
        return consulta[a];
      });
      if (actual.length > 0) {
        res.json(actual);
      } else {
        throw { codigo: 404, mensaje: "El expediente no existe" };
      }
    } catch (error) {
      if (error.codigo) {
        res.status(error.codigo).send(error.mensaje);
      } else {
        res.status(500).send("Error inesperado");
      }
    }
  });

  app.get("/tramiteactual", async (req, res) => {
    try {
      if (actual) {
        res.json(actual);
      } else {
        throw { codigo: 404, mensaje: "No hay expediente actual cargado" };
      }
    } catch (error) {
      if (error.codigo) {
        res.status(error.codigo).send(error.mensaje);
      } else {
        res.status(500).send("Error inesperado");
      }
    }
  });
} catch {
  console.log("No hay archivo xml con el nombre GenerInt_source.xml");
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 1700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("root/index.html");
};

apps.whenReady().then(() => {
  createWindow();
});

apps.on("window-all-closed", () => {
  if (process.platform !== "darwin") apps.quit();
});

app.listen(port, () => {
  console.log("Servidor escuchando en el puerto ", port);
});
