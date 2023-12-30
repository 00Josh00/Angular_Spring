import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-persona',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {
  persona: Persona;
  titulo: string = 'Detalle de la Persona';
  public fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    private personaService: PersonaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id: number = +params.get('id');
      if (id) {
        this.personaService.getPersona(id).subscribe((persona) => {
          this.persona = persona;
        });
      }
    });
  }

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
    this.personaService
      .subirFoto(this.fotoSeleccionada, this.persona.id)
      .subscribe((persona) => {
        this.persona = persona;
        swal.fire(
          'La foto se ha subido correctamente!',
          `La foto se ha subido con exito: ${this.persona.foto}`,
          'success'
        );
      });
  }
}
