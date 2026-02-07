/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del usuario generado por MongoDB
 *           example: "507f1f77bcf86cd799439011"
 *         first_name:
 *           type: string
 *           description: Nombre del usuario
 *           example: "Juan"
 *         last_name:
 *           type: string
 *           description: Apellido del usuario
 *           example: "Pérez"
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario (debe ser único)
 *           example: "juan.perez@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña encriptada del usuario
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *           description: Rol del usuario en el sistema
 *           example: "user"
 *         pets:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID de la mascota
 *           description: Array de IDs de mascotas adoptadas por el usuario
 *           example: []
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         first_name: "Juan"
 *         last_name: "Pérez"
 *         email: "juan.perez@example.com"
 *         role: "user"
 *         pets: []
 *     
 *     UserInput:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *       properties:
 *         first_name:
 *           type: string
 *           example: "Juan"
 *         last_name:
 *           type: string
 *           example: "Pérez"
 *         email:
 *           type: string
 *           format: email
 *           example: "juan.perez@example.com"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: "user"
 *     
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         error:
 *           type: string
 *           example: "User not found"
 *     
 *     Success:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         message:
 *           type: string
 *           example: "User updated"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestión de usuarios del sistema AdoptMe
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     description: Retorna una lista con todos los usuarios registrados en el sistema
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtiene un usuario específico por ID
 *     tags: [Users]
 *     description: Retorna la información completa de un usuario basándose en su ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario (ObjectId de MongoDB)
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Users]
 *     description: Actualiza la información de un usuario específico
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario a actualizar
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           example:
 *             first_name: "Juan Carlos"
 *             last_name: "Pérez García"
 *             email: "juancarlos@example.com"
 *             role: "admin"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Users]
 *     description: Elimina permanentemente un usuario del sistema
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario a eliminar
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 */