// Função para validação de e-mail
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Função para validar nome (não pode ser vazio)
  export const validateName = (name: string): boolean => {
    return name.trim().length > 0;
  };
  
  // Você pode adicionar outras funções de validação aqui no futuro, como:
  export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  export const validateRole = (role: string): boolean => {
    return role === "ADMIN" || role === "USER" ;
  };