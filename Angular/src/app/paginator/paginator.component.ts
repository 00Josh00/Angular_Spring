import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit {
  @Input() paginador: any;

  paginas: number[];

  constructor() {}

  ngOnInit() {
    this.paginas = new Array(this.paginador.totalPages)
      .fill(0)
      .map((valor, indice) => indice + 1);
  }
}
