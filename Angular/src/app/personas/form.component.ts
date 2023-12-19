import { Component, OnInit } from '@angular/core';
import { Persona } from './persona';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public persona: Persona = new Persona();
  public titulo: string = 'Agregar Personas';

  ngOnInit(): void {}

  public create(): void {
    console.log('Clicked!');
    console.log(this.persona);
  }
}
