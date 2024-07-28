const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const { connectToDatabase, sql } = require('./db');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectToDatabase();

app.get('/movies', async (req, res) => {
    try {
    const result = await sql.query`SELECT * FROM Peliculas`;
    res.json(result.recordset);
} catch (err) {
    res.status(500).send({ message: 'ERROR: ' +err.message });
}
});

app.get('/series', async (req, res) => {
    try {
    const result = await sql.query`SELECT * FROM Series`;
    res.json(result.recordset);
} catch (err) {
    res.status(500).send({ message: 'ERROR: ' +err.message });
}
});


app.post('/login', async (req, res) => {
    const { Correo, Contraseña } = req.body;

    try {
        const result = await sql.query`
        SELECT * FROM Usuarios WHERE Correo = ${Correo}
        `;

        if (result.recordset.length > 0) {
        const user = result.recordset[0];

        // Compara la contraseña proporcionada con la encriptada almacenada
        const isMatch = await bcrypt.compare(Contraseña, user.Contraseña);

        if (isMatch) {
            res.status(200).send({ message: 'Login Correcto', user });
        } else {
            res.status(401).send({ message: 'Email o Contraseña Incorrectos' });
        }
        } else {
        res.status(401).send({ message: 'Email o Contraseña Incorrectos' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


// Ruta para agregar a favoritos
app.post('/favorites', async (req, res) => {
    const { usuarioId, peliculaId, serieId } = req.body;
    
    try {
      await sql.query`
        INSERT INTO Favoritos (usuarioId, peliculaId, serieId)
        VALUES (${usuarioId}, ${peliculaId}, ${serieId})
      `;
      res.status(201).send({ message: 'Favorito agregado correctamente' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });

  //NO FUNCIONA
  // Ruta para obtener favoritos por usuario
  app.get('/favorites/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    
    try {
      const result = await sql.query`
        //
      `;
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
  
  // Ruta para eliminar de favoritos
  app.delete('/favorites', async (req, res) => {
    const { usuarioId, peliculaId, serieId } = req.body;
  
    try {
      await sql.query`
        DELETE FROM Favoritos
        WHERE usuarioId = ${usuarioId} AND 
        (peliculaId = ${peliculaId} OR serieId = ${serieId})
      `;
      res.status(200).send({ message: 'Favorito eliminado correctamente' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });   

app.listen(port, () => {
    console.log(`Server funcionando en http://localhost:${port}`);
});
