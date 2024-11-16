import httpStatus from "../helpers/httpStatus.js";
import { encrypt, verified } from "../utils/bcrypt.js";
import { PrismaClient, User } from "@prisma/client";
import { generateToken, verifyToken } from "../utils/jwt.service.js";

// Instancia de PrismaClient para interactuar con la base de datos
const prisma = new PrismaClient();

// Interface para el payload del JWT (decodificado)
interface JwtPayload {
  id: string;
  email: string;
  // Otros campos que puedas tener en el payload del token
}

// Controlador para manejar las operaciones relacionadas con los usuarios
export const userController = () => {

  /**
   * Registra un nuevo usuario.
   *
   * @param req - Objeto de solicitud HTTP que contiene los datos del nuevo usuario (nombre, correo, etc.).
   * @param res - Objeto de respuesta HTTP que contiene el usuario creado y el token de autenticación.
   * @param next - Función que maneja el paso del error al middleware correspondiente.
   * @returns
   */
  const register = async (req: any, res: any, next: any) => {
    const newUser = req.body;
    const hashPass = await encrypt(newUser.password);
    newUser.password = hashPass;

    try {
      // Creación del nuevo usuario en la base de datos
      const createdUser = await prisma.user.create({ data: newUser });

      // Generación de un token JWT para el nuevo usuario
      const token = generateToken({
        id: createdUser.id,
        email: createdUser.email,
      });

      // Guardar el token en una cookie con seguridad
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      const responseFormat = {
        data: createdUser,
        token,
        message: "User created successfully",
      };

      return res.status(httpStatus.CREATED).json(responseFormat);
    } catch (error: any) {
      // Manejo de errores por conflictos de unicidad (por ejemplo, correo o nombre de usuario ya registrado)
      if (error.code === "P2002") {
        const field = error.meta.target[0]; // Obtenemos el campo que generó el conflicto
        let message = "Ya existe un usuario registrado con ese ";
        if (field === "email") {
          message += "email.";
        } else if (field === "username") {
          message += "nombre de usuario.";
        }

        return res.status(400).json({ message });
      }

      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  /**
   * Inicia sesión con un usuario registrado.
   * 
   * @param req - Objeto de solicitud HTTP que contiene el correo y la contraseña del usuario.
   * @param res - Objeto de respuesta HTTP que contiene el usuario y el token de autenticación.
   * @param next - Función que maneja el paso del error al middleware correspondiente.
   * @returns Respuesta HTTP con el usuario autenticado y el token de autenticación.
   */
  const login = async (req: any, res: any, next: any) => {
    const { email, password } = req.body;
    try {
      // Buscar al usuario por correo
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.clearCookie("token");
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: "User not found" });
      }

      // Verificar la contraseña ingresada
      const isMatch = await verified(password, user.password);
      if (!isMatch) {
        res.clearCookie("token");
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Invalid credentials" });
      }

      // Generación de un token JWT para el usuario autenticado
      const token = generateToken({ id: user.id, email: user.email });

      // Guardar el token en una cookie con seguridad
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      const responseFormat = {
        data: user,
        token,
        message: "Successfully login",
      };

      return res.status(httpStatus.OK).json(responseFormat);
    } catch (error: any) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  /**
   * Cierra la sesión del usuario y elimina el token de la cookie.
   * 
   * @param _req - Petición vacía, ya que no se requiere datos.
   * @param res - Objeto de respuesta HTTP que confirma que el usuario ha cerrado sesión.
   * @param _next - Función que maneja el paso del error al middleware correspondiente.
   * @returns Respuesta HTTP confirmando el cierre de sesión.
   */
  const logout = async (_req: any, res: any, _next: any) => {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out." });
  };

  /**
   * Actualiza los datos de un usuario.
   * 
   * @param req - Objeto de solicitud HTTP que contiene los nuevos datos del usuario.
   * @param res - Objeto de respuesta HTTP con los datos actualizados del usuario.
   * @param next - Función que maneja el paso del error al middleware correspondiente.
   * @returns Respuesta HTTP con los datos actualizados del usuario.
   */
  const update = async (req: any, res: any, next: any) => {
    const id = req.tokenId; // ID del usuario obtenido del token
    const updateUser = req.body;

    try {
      // Actualizar los datos del usuario en la base de datos
      const user = await prisma.user.update({
        where: { id },
        data: updateUser,
      });

      const responseFormat = {
        data: user,
        message: "User updated successfully",
      };

      return res.status(200).json(responseFormat);
    } catch (err: any) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  };

  /**
   * Elimina un usuario por su ID.
   * 
   * @param req - Objeto de solicitud HTTP que no requiere datos, ya que el ID se obtiene del token.
   * @param res - Objeto de respuesta HTTP confirmando que el usuario ha sido eliminado.
   * @param next - Función que maneja el paso del error al middleware correspondiente.
   * @returns Respuesta HTTP confirmando la eliminación del usuario.
   */
  const deleteById = async (req: any, res: any, next: any) => {
    const id = req.tokenId; // ID del usuario obtenido del token

    try {
      // Eliminar el usuario de la base de datos
      await prisma.user.delete({
        where: { id },
      });

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err: any) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  };

  /**
   * Obtiene el perfil de un usuario por su ID.
   * 
   * @param req - Objeto de solicitud HTTP que contiene el ID del usuario.
   * @param res - Objeto de respuesta HTTP con los datos del usuario.
   * @param next - Función que maneja el paso del error al middleware correspondiente.
   * @returns Respuesta HTTP con el perfil del usuario.
   */
  const profile = async (req: any, res: any, next: any) => {
    const { id } = req.query;

    try {
      // Recuperar los datos del usuario por su ID
      const user = await prisma.user.findUnique({ where: { id } });

      const responseFormat = {
        data: user,
        message: "User retrieved successfully",
      };

      return res.status(200).json(responseFormat);
    } catch (err: any) {
      next(err);
    } finally {
      await prisma.$disconnect();
    }
  };

  /**
   * Verifica si el token JWT es válido.
   * 
   * @param req - Objeto de solicitud HTTP que contiene el token en las cookies.
   * @param res - Objeto de respuesta HTTP con el estado de validación del token.
   * @param next - Función que maneja el paso del error al middleware correspondiente.
   * @returns Respuesta HTTP indicando si el token es válido o no.
   */
  const verify = async (req: any, res: any, next: any) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "No token provided" });
      }

      // Decodificamos el token y hacemos un casting explícito a JwtPayload
      const decoded = verifyToken(token) as JwtPayload;

      // Verificamos si el decoded contiene el id
      if (!decoded || !decoded.id) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Invalid token" });
      }

      // Convertimos el id a un número
      const userId = parseInt(decoded.id, 10);  // Convertimos el string a número

      // Usamos el id de decoded para buscar el usuario
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: "User not found" });
      }

      const responseFormat = {
        data: user,
        message: "Token is valid.",
      };

      return res.status(200).json(responseFormat);

    } catch (error: any) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User unauthorized" });
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    register,
    login,
    logout,
    update,
    deleteById,
    profile,
    verify,
  };
};
