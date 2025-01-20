import User from "../../models/user/user_model";
import { createUserService } from "../../service/user/user_service";

export const createAdminUser = async () => {
    const adminData = {
        name: "admin",
        email: "admin@admin.com",
        password: "$admin",
    };

    try {
        const existingAdmin = await User.findOne({ where: { email: adminData.email } });
        if (!existingAdmin) {
            await createUserService(adminData);
        }
    } catch (error) {
        console.error("Erro ao verificar/criar o usuário admin:", error);
    }
}

