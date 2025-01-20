import { findUserByEmailService } from "../../service/user/user_service"
import { generateToken, verifyToken } from "../../utils/auth/jwt"

export const createAccessToken = async (emailUser: string, passwordUser: string) => {
  let auth = true
  const user = await findUserByEmailService(emailUser)

  if (!user || user.password !== passwordUser) {
    throw new Error("Usuário não encontrado ou senha incoreta.");
  }

  const payload = {
    name: user.name,
    email: user.email,
    role: user.role,
    id: user.id,
  }

  const accessToken = generateToken(payload)

  return {
    auth,
    accessToken,
    user: payload,
  }
}

export const validateAccessToken = (authorization: string) => {
  const [, token] = authorization.split(" ")
  const isVerified = verifyToken(token)
  return isVerified
}


