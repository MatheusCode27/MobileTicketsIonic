import { Component } from '@angular/core';
import { TicketService } from '../services/ticket';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  constructor(public ticketService: TicketService) {}

}