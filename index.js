const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const EXPO_PUSH_API = 'https://exp.host/--/api/v2/push/send';
const PROJECT_ID = 'a46893f9-5cbf-4f7b-9a40-92441804d0e7'; // Tu projectId

// Ruta para enviar notificación
app.post('/enviar-notificacion', async (req, res) => {
  const { to, title, body, data } = req.body;

  const mensaje = {
    to,
    sound: 'default',
    title: title || 'Título de prueba',
    body: body || 'Contenido de la notificación',
    data: data || {},
    _displayInForeground: true,
  };

  try {
    const respuesta = await axios.post(EXPO_PUSH_API, mensaje, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'expo-project-id': PROJECT_ID, // Incluyendo el projectId en los headers
      },
    });
    res.status(200).send({ message: 'Notificación enviada', respuesta: respuesta.data });
  } catch (error) {
    console.error('Error enviando la notificación:', error);
    res.status(500).send({ error: 'Error enviando la notificación' });
  }
});

// Iniciar servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
