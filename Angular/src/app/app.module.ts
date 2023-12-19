import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directivas/directiva.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonaService } from './personas/persona.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/personas', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'personas', component: PersonasComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    PersonasComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  providers: [PersonaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
