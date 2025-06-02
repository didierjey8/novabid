export interface UserProfile {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento?: Date;
  direccion?: {
    calle: string;
    ciudad: string;
    codigoPostal: string;
    pais: string;
  };
  telefono?: string;
  roles: ('admin' | 'usuario' | 'editor')[];
  activo: boolean;
  ultimoAcceso: Date;
}