import { Usuario } from './usuario';

export interface Login {
    id?: number,
    email: string,
    senha: string,
    usuario?: Usuario
}
