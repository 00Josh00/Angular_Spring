import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-directiva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directiva.html'
})
export class Directiva {
  listaCurso: string[] = ['Java', 'Python', 'Spring', 'Angular'];

  habilitar: boolean = true;

  constructor() { }

  setHabilitar(): void {
    this.habilitar = !this.habilitar;
  }
}
