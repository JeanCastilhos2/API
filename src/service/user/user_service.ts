import User from "../../models/user/user_model";
import { validateEmail, validateName, validatePassword, validateRole } from "../../utils/validators/validators";

// Serviço para criação de um usuário
export const createUserService = async (data: { name: string; email: string; password: string }) => {
  const { name, email, password } = data;

  // Validações
  if (!validateName(name)) {
    throw new Error("O nome é obrigatório e não pode estar vazio.");
  }

  if (!validateEmail(email)) {
    throw new Error("Um e-mail válido é obrigatório.");
  }

  if (!validatePassword(password)) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }

  // Verifica se o e-mail já existe
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("E-mail já está em uso.");
  }

  // Cria o usuário
  return await User.create({ name, email, password });
};

// Serviço para buscar todos os usuários
export const findAllUsersService = async () => {
  return await User.findAll({ raw: true });
};

// Serviço para buscar um usuário por ID
export const findUserByIdService = async (id: string) => {
  if (!id) {
    throw new Error("ID é obrigatório.");
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
};

export const findUserByEmailService = async (email: string) => {
  if (!email) {
    throw new Error("Email é obrigatório.");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
};

// Serviço para atualizar um usuário
export const updateUserService = async (id: string, data: Partial<{ name: string; email: string; password: string; role: string }>) => {
  const { name, email, password, role } = data;

  if (!id) {
    throw new Error("ID é obrigatório.");
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  // Validações
  if (name && !validateName(name)) {
    throw new Error("O nome não pode estar vazio.");
  }

  if (email && !validateEmail(email)) {
    throw new Error("E-mail inválido.");
  }

  if (password && !validatePassword(password)) {
    throw new Error("Password inválido.");
  }

  if (role && !validateRole(role)) {
    throw new Error("Password inválido.");
  }

  // Atualiza o usuário
  return await user.update(data);
};

// Serviço para deletar um usuário
export const deleteUserService = async (id: string) => {
  if (!id) {
    throw new Error("ID é obrigatório.");
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return await user.destroy();
};


