const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const favicon = require("serve-favicon");
const Database = require("./database");
const app = express();

app.use(express.json());

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Configurar la carpeta 'public' para servir archivos estáticos
app.use(express.static("public"));

// Ruta para el index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/employee", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "employee.html"));
});

const db = new Database();
db.connection;

app.post("/api/employees", (req, res) => {
  const data = req.body;
  db.insert('employee', data, (err, results) => {
    if (err) {
      console.error('Failed to insert data:', err);
      res.status(500).send('Failed to insert data');
    } else {
      console.log('Data inserted successfully:', results);
      res.status(200).json(results);
    }
  });
})

app.get('/api/get', (req, res) => {
  const { id } = req.query; // Obtener el parámetro 'id' de la query string
  db.select(id, (err, results) => {
    if (err) {
      console.error("Failed to fetch employee:", err);
      return;
    }

    res.json(results);
  });
  // Enviar una respuesta al cliente
});

app.get('/api/bests', (req, res) => {
  db.select(id, (err, results) => {
    if (err) {
      console.error("Failed to fetch employee:", err);
      return;
    }
    console.log("Employee data:", results);
    res.json(results[0]);
  });
  // Enviar una respuesta al cliente
});


app.get("/ping", (req, res) => {
  try {
    db.test((err, res)=>{
      if (err) {
        console.log('Error en la conexion: ', err)
        return
      }
    })
    res.json(res[0])
  } catch (error) {
    console.log(error);
  }
});


// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  db.end();
  process.exit();
});
