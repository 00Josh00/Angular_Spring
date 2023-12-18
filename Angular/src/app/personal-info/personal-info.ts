export class PersonalInfo {
    id: number; // Identificador único
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    direccion: string;
    createAt: string;

    constructor(
        id: number,
        nombre: string,
        apellidos: string,
        email: string,
        telefono: string,
        direccion: string,
        createAt: string,
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.createAt = createAt;
    }
}

