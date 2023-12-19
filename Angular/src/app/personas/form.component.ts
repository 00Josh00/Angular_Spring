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

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe((param) => {
      let id = param['id'];
      if (id) {
        this.personaService
          .getPersona(id)
          .subscribe((persona) => (this.persona = persona));
      }
    });
  }

  public create(): void {
    this.personaService.create(this.persona).subscribe((persona) => {
      this.router.navigate(['/personas']);
      swal.fire(
        'Persona Guardada',
        `Persona ${this.persona.nombre} creada con éxito`,
        'success'
      );
    });
  }
}
