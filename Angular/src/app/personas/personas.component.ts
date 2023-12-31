import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { ModalService } from './detalle/modal.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
})
export class PersonasComponent implements OnInit {
  personas: Persona[];
  paginador: any;
  personaSeleccionada: Persona;

  constructor(
    private personaService: PersonaService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.personaService
        .getPersonas(page)
        .pipe(
          tap((response) => {
            console.log('PersonasComponent: tap 3');
            (response.content as Persona[]).forEach((persona) => {
              console.log(persona.nombre);
            });
          })
        )
        .subscribe((response) => {
          this.personas = response.content as Persona[];
          this.paginador = response;
        });
    });

    this.modalService.notificarUpload.subscribe((persona) => {
      this.personas = this.personas.map((personaOriginal) => {
        if (persona.id == personaOriginal.id) {
          personaOriginal.foto = persona.foto;
        }
        return personaOriginal;
      });
    });
  }

  delete(persona: Persona): void {
    swal
      .fire({
        title: 'Estas seguro?',
        text: `Seguro que desea eliminar a la persona ${persona.nombre} ${persona.apellidos}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.personaService.delete(persona.id).subscribe((response) => {
            this.personas = this.personas.filter((per) => per !== persona);
            swal.fire({
              title: 'Persona eliminada!',
              text: `Persona ${persona.nombre} eliminada con exito`,
              icon: 'success',
            });
          });
        }
      });
  }
  abrirModal(persona: Persona) {
    this.personaSeleccionada = persona;
    this.modalService.abrirModal();
  }
}
