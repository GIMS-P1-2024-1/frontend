const getToken = () => {
    return localStorage.getItem('authToken');
};

const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('authToken', token);
    } else {
        localStorage.removeItem('authToken');
    }
};

const fetchWithAuth = (url, options = {}) => {
    const token = localStorage.getItem('authToken');
    const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };

    return fetch(url, { ...options, headers });
};

const login = async (username, password) => {
    const url = `${process.env.REACT_APP_API_URL}/token`;
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    formData.append('scope', '');
    formData.append('client_id', clientId || '');
    formData.append('client_secret', clientSecret || '');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao fazer login');
        }

        const data = await response.json();

        return {
            success: true,
            token: data.access_token,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Erro ao fazer login',
        };
    }
};

export { getToken, setAuthToken, fetchWithAuth, login };
