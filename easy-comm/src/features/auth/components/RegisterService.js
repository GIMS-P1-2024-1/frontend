// RegisterService.js

export const validateEmail = (email) => {
    const domainRegex = /^[^\s@]+@(copin\.ufcg\.edu\.br|ccc\.ufcg\.edu\.br|estudante\.ufcg\.edu\.br|computacao\.ufcg\.edu\.br)$/;
    return domainRegex.test(email);
};

export const validateUsername = (username) => {
    return username.length >= 3 && !username.includes(' ');
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
   // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{9,}$/; se quiser tirar o caractere especial.
    return passwordRegex.test(password);
};