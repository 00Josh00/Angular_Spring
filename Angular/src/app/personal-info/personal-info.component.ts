import { Component, OnInit } from '@angular/core';
import { PersonalInfo } from './personal-info';
import { PersonalInfoService } from './personal-info.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
})
export class PersonalInfoComponent implements OnInit {
  personalInfo: PersonalInfo[] = [];

  constructor(private personalInfoService: PersonalInfoService){

  }

  ngOnInit() {
    this.personalInfoService.getPersonalInfo().subscribe(
      (personalInfo) => this.personalInfo = personalInfo
    );
  }
  
}
