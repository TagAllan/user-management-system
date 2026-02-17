import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

class AuthService {
    async login(email, password){
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });
        if (response.data.token){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUser(){
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export default new AuthService();