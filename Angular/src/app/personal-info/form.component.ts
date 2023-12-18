import { Component, OnInit } from '@angular/core';
import { PersonalInfo } from './personal-info';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit{
  public personalinfo: PersonalInfo = new PersonalInfo();
  public titulo:string = "Crear Cliente"
  constructor(){}

  ngOnInit(){
  }

  public create(): void{
    console.log("Clicked!")
    console.log(this.personalinfo)
  }
}
