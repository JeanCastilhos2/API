import { Request, Response } from "express";
import {
    createUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
    deleteUserService
} from "../../service/user/user_service";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        await createUserService(data)
        res.status(201).json({ message: "Usuaário cadastrado!", data });
    } catch (error) {
        res.status(400).json({ mensagem: "Não foi possível cadastrar o usuário." });
    }
};

export const findAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await findAllUsersService()
        res.status(200).json({ message: "Usuários encontrados!", users: users });
    } catch (error) {
        res.status(400).json({ mensagem: "Não foi possível encontrar usuários." });
    }
};


export const findUserController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await findUserByIdService(id)
        res.status(200).json({ message: "Usuário encontrado!", user: user });
    } catch (error) {
        res.status(400).json({ mensagem: "Não foi possível encontrar usuário." });
    }
};


export const updateUserController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, email, password, role } = req.body;
        const data = { name, email, password, role }
        await updateUserService(id, data)
        res.status(204).json({ message: "Usuário editado!", id });
    } catch (error) {
        res.status(400).json({ mensagem: "Não foi possível editar o usuário." });
    }
};

export const deleteUserController = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        deleteUserService(id)
        res.json({ message: "Usuário deletado!", id });
    } catch (error) {
        res.status(400).json({ mensagem: "Não foi possível deletar o usuário." });
    }
};