export class PersonalInfo {
    id: number; // Identificador único
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    direccion: string;
    createAt: string;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.apellidos = '';
        this.email = '';
        this.telefono = '';
        this.direccion = '';
        this.createAt = '';
    }
    
}

