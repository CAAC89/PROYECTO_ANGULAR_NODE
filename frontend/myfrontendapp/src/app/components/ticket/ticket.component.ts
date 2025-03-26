import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TableTicketComponent } from "../table-ticket/table-ticket.component";

@Component({
  selector: 'app-ticket',
  imports: [HeaderComponent, TableTicketComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  

}
