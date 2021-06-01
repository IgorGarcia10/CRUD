import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  private clientesSubscription: Subscription;
  public estaCarregando = false;
  //totalDeClientes: number = 10;
  totalDeClientes: number = 0;
  totalDeClientesPorPagina: number = 2;
  opcoesTotalDeClientesPorPagina = [2, 5, 10];
  paginaAtual: number = 1; //definir
  constructor(public clienteService: ClienteService) { }

  onPaginaAlterada(dadosPagina: PageEvent) {
    //console.log (dadosPagina);
    this.estaCarregando = true;
    this.paginaAtual = dadosPagina.pageIndex + 1; //no paginator a contagem começa de 0
    this.totalDeClientesPorPagina = dadosPagina.pageSize;
    this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
  }


  /*  ngOnInit(): void {
     this.estaCarregando = true;
     this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
     this.clientesSubscription = this.clienteService
       .getListaDeClientesAtualizadaObservable()
       .subscribe((clientes: Cliente[]) => {
         this.estaCarregando = false;
         this.clientes = clientes;
       });
   } */
  ngOnInit(): void {
    this.estaCarregando = true;
    this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
    this.clientesSubscription = this.clienteService
      .getListaDeClientesAtualizadaObservable()
      .subscribe((dados: { clientes: [], maxClientes: number }) => {
        this.estaCarregando = false;
        this.clientes = dados.clientes;
        this.totalDeClientes = dados.maxClientes
      });
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  /*  onDelete(id: string): void {
     this.clienteService.removerCliente(id);
   } */

  onDelete(id: string): void {
    this.estaCarregando = true;
    this.clienteService.removerCliente(id).subscribe(() => {
      this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
    });
  }
}
