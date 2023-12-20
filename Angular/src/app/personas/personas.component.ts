import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
})
export class PersonasComponent implements OnInit {
  personas: Persona[];

  constructor(private personaService: PersonaService) {}

  ngOnInit() {
    this.personaService
      .getPersonas()
      .subscribe((personas) => (this.personas = personas));
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
}
