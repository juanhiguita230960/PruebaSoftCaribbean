import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router,ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente"
  public validarEditar:boolean = false;

  constructor(private clienteService:ClienteService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

 public create(): void{
  this.clienteService.create(this.cliente)
  .subscribe(
    json => {
      this.router.navigate(['/clientes'])
      swal.fire('Nuevo cliente',`${json.mensaje} ${json.cliente.cus_dsnombres}`,'success')
    }
  )
 }

 cargarCliente(): void{
   this.activatedRoute.params.subscribe(params => {
     let id = params['id']
      if (id) {
        this.validarEditar = true;
        this.clienteService.getCliente(id).subscribe((json) => this.cliente = json.cliente)
      }
      }
   )
 }

 update(): void{
   this.clienteService.update(this.cliente).subscribe(json => {
     this.router.navigate(['/clientes'])
     swal.fire('Cliente actualizado', `Cliente ${ json.cliente.cus_dsnombres } actualizado con éxito!`, 'success')
     }
   )
 }


}
