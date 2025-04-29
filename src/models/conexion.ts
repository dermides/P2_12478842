import sqlite from 'sqlite3';

import path from 'path';
import { error } from 'console';

const db = new sqlite.Database(
    path.resolve(__dirname, '../database/database.db'),
    (error) => {

        if (error) {
            console.error('No de pudo abrir la db ' + error.message);
        } else {
            console.log('Conexcion a la base de datos exitosa.');
        }

        const sql = `
           CREATE TABLE IF NOT EXISTS contactos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT NOT NULL,
                comentario TEXT NOT NULL,
                fecha_creado timestamp DEFAULT CURRENT_TIMESTAMP,
                direccion_ip TEXT NOT NULL
                
            )`;

        db.run(sql, (error) => {
            if (error) {
                console.error('Error al crear la tabla: ' + error.message);
            } else {
                console.log('Tabla contactos creada o ya existe.');
            }
        });

    }
);

export default db;