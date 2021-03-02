import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  habilitar: boolean = true; 

  listaCurso: string[] = ['TypesCrypt','JavaScript','Java', 'C#','PHP'];

  mensaje: string = '';

  constructor() { }

  setHabilitar(): void{
    this.habilitar = (this.habilitar==true)? false:true;
  }

  showName(): string{
    this.mensaje = this.habilitar==true? 'Ocultar':'Habilitar';
    return this.mensaje;
  }

}
