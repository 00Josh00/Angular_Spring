import { Component, Input, OnInit } from '@angular/core';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-persona',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
})
export class DetalleComponent implements OnInit {
  @Input() persona: Persona;
  titulo: string = 'Detalle de la persona';
  public fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    private personaService: PersonaService,
    public modalService: ModalService
  ) {}

  ngOnInit() {}

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser del tipo imagen',
        'error'
      );
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.personaService
        .subirFoto(this.fotoSeleccionada, this.persona.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.persona = response.persona as Persona;
            swal.fire(
              'La foto se ha subido completamente!',
              response.mensaje,
              'success'
            );
          }
        });
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
