import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
import { Router } from '@angular/router';

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
    this.personaService
      .create(this.persona)
      .subscribe((reponse) => this.router.navigate(['/personas']));
  }
}
