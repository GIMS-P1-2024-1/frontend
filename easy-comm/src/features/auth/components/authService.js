export const mockUserData = {
    email: "teste@exemplo.com",
    password: "123456"
};

export const login = async (email, password) => {
    if (email === mockUserData.email && password === mockUserData.password) {
        return { success: true };
    } else {
        return { success: false, message: "Email ou senha incorretos." };
    }

    // Lógica futura para o backend (descomentando para integrar):
    /*
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data; // Retorna os dados da resposta do backend
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw new Error('Erro ao fazer login.');
    }
    */
};
