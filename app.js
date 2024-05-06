const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3003;


//Postgress
const { Client } = require('pg');
// Configuración de la conexión a PostgreSQL
const client = new Client({
    user: 'nombre_de_usuario',
    host: 'localhost',
    database: 'business',
    password: '123',
    port: 5432, // Puerto predeterminado de PostgreSQL
});
// Conectar a la base de datos
client.connect()
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos', err));



// Crear conexión a la base de datos SQLite
/* const db = new sqlite3.Database('./restaurant.db', err => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos SQLite');
    }
}); */

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Middleware para manejar errores de cliente
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({ error: 'Error en el formato de la solicitud' });
    } else {
        next();
    }
});

// Manejo de errores globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Rutas CRUD para la tabla de usuarios
/* app.post('/usuarios', (req, res) => {
    const { nombre, correo_electronico, contraseña, fecha_registro } = req.body;

    if (!nombre || !correo_electronico || !contraseña || !fecha_registro) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const sql = `INSERT INTO usuarios (nombre, correo_electronico, contraseña, fecha_registro) VALUES (?, ?, ?, ?)`;
    db.run(sql, [nombre, correo_electronico, contraseña, fecha_registro], function(err) {
        if (err) {
            console.error('Error al crear el usuario:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ message: 'Usuario creado exitosamente', id: this.lastID });
    });

}); */

app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM usuarios WHERE ID_Usuario = ?`;

    /////
    ////
    client.query(sql, (err, res) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
            return;
        }
        console.log('Filas seleccionadas:', res.rows);
    });
    ////

    /////
    /* db.get(sql, [id], (err, row) => {
        if (err) {
            console.error('Error al obtener el usuario!!!:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(row);
    }); */
});

// Repite el manejo de errores para las demás operaciones CRUD y para otras tablas

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
