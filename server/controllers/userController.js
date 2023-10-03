import { userExists, registerUser } from '../dao/mongo/users.mongo.js'; 

// Controlador para registrar un nuevo usuario
async function registerUserController(req, res) {
  const { userName } = req.body;

  try {
    const exists = await userExists(userName);

    if (exists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    await registerUser(userName);

    return res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
}

export default registerUserController;