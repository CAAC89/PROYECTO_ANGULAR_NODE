import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket/ticket.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

//INTERFACE TICKET USED
interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedUser: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-table-ticket',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './table-ticket.component.html',
  styleUrl: './table-ticket.component.scss'
})
export class TableTicketComponent {

  //VARIABLES------------------------------
  data: Ticket[] = [];
  selectedTicket: Ticket | null = null;
  errorMessage = '';
  sucessMessage = '';
  // User Filter
  filteredData = [...this.data];
  searchTerm: string = '';
  sortColumn: string = '';

  //CONTRUCTOR--------------------------------
  constructor(private authService: AuthService, private userService: UserService, private ticketService: TicketService, private el: ElementRef) { }

  //INIT METHOD CHANGE DATA---------------------
  ngOnInit(): void {
    this.getAllTicket();
  }

  //METHODS---------------------------------

  //MODAL----
  openShowModal(ticket: Ticket): void {
    this.selectedTicket = { ...ticket };
  }

  openEditModal(ticket: Ticket): void {
    this.selectedTicket = { ...ticket };
  }

  openDeleteModal(ticket: Ticket): void {
    this.selectedTicket = { ...ticket };
  }

  openAddModal() {
    // Elimina el backdrop si existe
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove(); // Elimina el elemento del DOM
    }

    // Agregar el backdrop manualmente
    const newBackdrop = document.createElement('div');
    newBackdrop.classList.add('modal-backdrop', 'fade', 'show');
    document.body.appendChild(newBackdrop);

    // Mostrar el modal
    const modal = this.el.nativeElement.querySelector('#addTicketModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  closeAddModal() {
    // Quitar la clase 'show' del backdrop (fondo del modal)
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('show'); // Elimina la clase 'show'
      backdrop.remove(); // Elimina el elemento del DOM
    }

    const modal = this.el.nativeElement.querySelector('#addTicketModal');
    if (modal) {
      // Elimina la clase 'show' y oculta el modal manualmente
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }


  

  //FILTER-
  filterTicket() {
    this.filteredData = this.data.filter(ticket =>
      ticket.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.assignedUser.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  //GET ALL TICKET-
  getAllTicket(): void {
    this.ticketService.getAllTickets(this.authService.getToken() ?? '').subscribe((response) => {
      this.data = response;
      this.filterTicket();
    }, (error) => {
      // En caso de error, lo manejas aquí

    }
    );
  }


  //UPDATE TICKET-
  saveChanges(): void {
    if (this.selectedTicket) {
      this.ticketService.updateTicket(this.selectedTicket, this.authService.getToken() ?? '').subscribe(
        () => {
          this.data = this.data.map(ticket => ticket._id === this.selectedTicket!._id ? this.selectedTicket! : ticket);
          this.selectedTicket = null;
          this.getAllTicket();
        },
        (error) => {

        }
      );
    }
  }

  //DELETE TICKET-
  deleteTicket(): void {
    if (this.selectedTicket) {
      this.ticketService.deleteTicket(this.selectedTicket, this.authService.getToken() ?? '').subscribe(
        () => {
          this.getAllTicket();
        },
        (error) => {

        }
      )
    }
  }


  //ADD TICKET-
  //MODEL TICKET INSERT
  newTicket = {
    title: "",
    description: "",
    status: "open",
    assignedUser: ""
  };

  newUserEmail = {
    email: ""
  };

  addTicket(): void {
    //Pasa el flujo por que es vacio la variable de usuario asignado y es opcional
    if (this.newTicket.assignedUser === "") {
      if (this.newTicket.title === "" || this.newTicket.description === "") {
        this.errorMessage = 'Fields empty';
        // Hacer que el mensaje de error desaparezca después de 3 segundos
        this.cleanErrorMessages();
      } else {
        this.ticketService.createTicket(this.newTicket, this.authService.getToken() ?? '').subscribe(
          () => {
            this.successAddExecute();
          },
          (error) => {
            this.errorMessage = error.message.statusText || 'Invalid credentials';
            // Hacer que el mensaje de error desaparezca después de 3 segundos
            this.cleanErrorMessages();
          }
        )
      }
    } else {//Para este flujo voy poner que el usuario asignado sea el correo electronico
      if (this.newTicket.title === "" || this.newTicket.description === "") {
        this.errorMessage = 'Fields empty';
        // Hacer que el mensaje de error desaparezca después de 3 segundos
        this.cleanErrorMessages();
      } else {
        this.newUserEmail.email=this.newTicket.assignedUser;
        
        this.userService.getUserByEmail(this.newUserEmail, this.authService.getToken() ?? '')
        .subscribe(() => {
          this.ticketService.createTicket(this.newTicket, this.authService.getToken() ?? '').subscribe(
          () => {
            this.successAddExecute();
          },
          (error) => {
            this.errorMessage = error.message.statusText || 'Invalid credentials';
            // Hacer que el mensaje de error desaparezca después de 3 segundos
            this.cleanErrorMessages();
          })
        }, (error) => {
          // En caso de error, lo manejas aquí
          this.errorMessage = error.message.statusText || 'Invalid credentials or email not exist';
          // Hacer que el mensaje de error desaparezca después de 3 segundos
          this.cleanErrorMessages();
        }
        );
      }
    }
  }

  successAddExecute():void{
    this.sucessMessage = "Register successful";
    this.getAllTicket();
    this.cleanSuccessMessages();
    this.closeAddModal();
  }

  cleanSuccessMessages(): void {
    setTimeout(() => {
      this.sucessMessage = '';
    }, 1500);
  }

  cleanErrorMessages(): void {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
