import { Component, OnInit } from '@angular/core';
import { PersonalInfo } from './personal-info';
import { PersonalInfoService } from './personal-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit{
  public personalinfo: PersonalInfo = new PersonalInfo();
  public titulo:string = "Crear Cliente"
  constructor(private personalInfoService:PersonalInfoService,
    private router: Router){}

  ngOnInit(){
  }

  public create(): void{
    this.personalInfoService.create(this.personalinfo).subscribe(
      Response => this.router.navigate(['/personal-info'])
    )
    console.log("Clicked!")
    console.log(this.personalinfo)
  }
}
