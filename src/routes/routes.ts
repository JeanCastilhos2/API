import { Router } from "express";
import { generateAccessToken } from "../controllers/auth/login_controller"
import { verifyAccessToken } from "../middlewares/auth/authMiddleware";
import {
  createUserController,
  findUserController,
  findAllUsersController,
  updateUserController,
  deleteUserController
} from "../controllers/user/user_controller";

const router = Router();

//Rota Login 

router.post("/login", generateAccessToken);

// Rotas para usuários

router.post("/user", verifyAccessToken, createUserController);
router.get("/users", verifyAccessToken, findAllUsersController);
router.get("/user/:id", verifyAccessToken, findUserController);
router.put("/user/:id",verifyAccessToken, updateUserController);
router.delete("/user/:id", verifyAccessToken, deleteUserController);

export const defineRoutes = () => router;