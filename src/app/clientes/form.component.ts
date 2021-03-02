import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public titulo: string = 'Formulario de Cliente';

  public cliente: Cliente = new Cliente();

  public errores: string[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.routeActive.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente
        })
      }
    })
  }

    create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire(
          'Cliente Actualizado',
          `El Cliente ${cliente.nombre} fue creado con Exito`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Codigo del error desde el backend: ' + err.status)
        console.error(err.error.errors);
      }
    )
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire(
          'Cliente Actualizado',
          `El Cliente ${cliente.nombre} fue Actualizado con Exito`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Codigo del error desde el backend: ' + err.status)
        console.error(err.error.errors);
      }
    )
  }

}
