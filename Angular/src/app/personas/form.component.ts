import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public persona: Persona = new Persona();
  public titulo: string = 'Agregar Personas';

  errores: string[];

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarPersona();
  }

  cargarPersona(): void {
    this.activatedRoute.params.subscribe((param) => {
      let id = param['id'];
      if (id) {
        this.personaService
          .getPersona(id)
          .subscribe((persona) => (this.persona = persona));
      }
    });
  }

  create(): void {
    this.personaService.create(this.persona).subscribe({
      next: (persona) => {
        this.router.navigate(['/personas']);
        swal.fire(
          'Nueva Persona',
          `${persona.nombre} ha sido creado con éxito`,
          'success'
        );
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      },
    });
  }

  update(): void {
    this.personaService.update(this.persona).subscribe({
      next: (json) => {
        this.router.navigate(['/personas']);
        swal.fire(
          'Persona Actualizada',
          `${json.mensaje}: ${json.persona.nombre}`,
          'success'
        );
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      },
    });
  }
}
