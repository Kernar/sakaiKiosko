export interface User {
    id: string;
    email: string;
    birthDate: Date;
    firstName: string;
    lastName: string;
    phone: number;
    username: string;
    password: string;
    role: 'admin' | 'user';  // Puede ser 'admin' o 'user'
}
