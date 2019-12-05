export interface User {
    email: string;
    nom: string;
    prenom: string;
    password: string;
    message?: string[];
    friends?: string[];
}