import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,
    private router: Router) { }

  /* Convertimos la lista de clientes a un Observable(Stream)
  Para que sea reactiva y se hace un cambio en el Back se 
  actualiza automaticamente ademas de que permite 
  multiples peticiones
  */
  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES)
    return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      map(response =>{
        let clientes = response as Cliente[]; //Convertimos a una lista de Clientes
        return clientes.map(client => {       // Retornamos la lista pero con algunos cambios  
          client.createAt = formatDate(client.createAt, 'EEEE dd, MMMM yyyy','en-US');
          return client;
        } );
      })
    )
  };

  //Metodo encargado de crear un cliente
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e =>{

        if(e.status == 400){
          return throwError(e);
        }

        console.log(e.error.mensaje);
        swal.fire(
          e.error.mensaje,
          e.error.error,
          'error'
        );
        return throwError(e);
      })
    )
  };

  //Obtener Cliente pasando el id
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje)
        swal.fire(
          'Error al Editar',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    )
  };

  //Actualizar un cliente
  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e =>{

        if(e.status == 400){
          return throwError(e);
        }

        console.log(e.error.mensaje);
        swal.fire(
          e.error.mensaje,
          e.error.error,
          'error'
        );
        return throwError(e);
      })
    )
  };

  //Eliminar un Cliente
  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e =>{
        console.log(e.error.mensaje);
        swal.fire(
          e.error.mensaje,
          e.error.error,
          'error'
        );
        return throwError(e);
      })
    )
  };

}
