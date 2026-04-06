import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Header, Footer, RouterOutlet]
})
export class App {
  protected readonly title = signal('clientes-app');

  curso = 'Curso Spring con Angular';

  profesor = 'Joseph';
}
