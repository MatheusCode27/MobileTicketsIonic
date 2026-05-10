import { Component } from '@angular/core';
import { TicketService } from '../services/ticket';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(public ticketService: TicketService) {}

  emitirSenha(tipo: string) {
    this.ticketService.emitirSenha(tipo);
  }

}