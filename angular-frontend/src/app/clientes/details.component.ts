import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id:number;
  public cliente: Cliente = new Cliente();
  constructor(private clienteService:ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarClienteById();
  }

  cargarClienteById(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
       if (id) {
         this.clienteService.getCliente(id).subscribe((json) => this.cliente = json.cliente)
       }
       }
    )
  }
}
