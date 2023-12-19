import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public persona: Persona = new Persona();
  public titulo: string = 'Agregar Personas';

  constructor(private personaService: PersonaService, private router: Router) {}

  ngOnInit(): void {}

  public create(): void {
    this.personaService.create(this.persona).subscribe((persona) => {
      this.router.navigate(['/personas']); // Corregido el paréntesis de cierre
      swal.fire(
        'Persona Guardada',
        `Persona ${this.persona.nombre} creada con éxito`,
        'success'
      ); // Agregados los puntos y coma
    });
  }
}
