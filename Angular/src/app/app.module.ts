import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { PersonalInfoService } from './personal-info/personal-info.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './personal-info/form.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {path: '', redirectTo: '/personal-info', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'personal-info', component: PersonalInfoComponent},
  {path: 'personal-info/form', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    PersonalInfoComponent,
    ExperienciaLaboralComponent,
    EstudiosComponent,
    HabilidadesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [PersonalInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
