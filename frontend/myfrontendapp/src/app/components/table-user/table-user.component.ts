import { Component, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//INTERFACE USER USED
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-table-user',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.scss'
})
export class TableUserComponent {

  //VARIABLES------------------------------
  status: number = 0;
  data: User[] = [];
  selectedUser: User | null = null;
  errorMessage = '';
  sucessMessage = '';
  // User Filter
  filteredData = [...this.data];
  searchTerm: string = '';
  sortColumn: string = '';


  //CONTRUCTOR--------------------------------
  constructor(private authService: AuthService, private userService: UserService, private el: ElementRef) { }

  //INIT METHOD CHANGE DATA---------------------
  ngOnInit(): void {
    this.userService.getUser(this.authService.getEmail() ?? '', this.authService.getToken() ?? '').subscribe(
      (response) => {
        // Usando forEach para recorrer el arreglo
        response.forEach((item: any) => {
          if ('admin' === item.role) {
            this.status = 1;
          }
          else if ('user' === item.role) {
            this.status = 2;
          }
        });
      },
      (error) => {
        // En caso de error, lo manejas aquí
        console.error('Error al obtener el usuario:', error);
        this.status = 0;
      }
    );
    this.getAllUser();
  }


  //METHODS---------------------------------

  //MODAL----

  openShowModal(user: User): void {
    this.selectedUser = { ...user };
  }

  openEditModal(user: User): void {
    this.selectedUser = { ...user };
  }

  openDeleteModal(user: User): void {
    this.selectedUser = { ...user };
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
    const modal = this.el.nativeElement.querySelector('#addUserModal');
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

    const modal = this.el.nativeElement.querySelector('#addUserModal');
    if (modal) {
      // Elimina la clase 'show' y oculta el modal manualmente
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  //FILTER-
  filterUsers() {
    this.filteredData = this.data.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  //GET ALL USER-
  getAllUser(): void {
    this.userService.getAllUser(this.authService.getToken() ?? '').subscribe((response) => {
      this.data = response;
      this.filterUsers();
    }, (error) => {
      // En caso de error, lo manejas aquí
    }
    );
  }

  //UPDATE USER-
  saveChanges(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser, this.authService.getToken() ?? '').subscribe(
        () => {
          this.data = this.data.map(user => user._id === this.selectedUser!._id ? this.selectedUser! : user);
          this.selectedUser = null;
          this.getAllUser();
        },
        (error) => {

        }
      );
    }
  }
  //DELETE USER -
  deleteUser(): void {
    if (this.selectedUser) {
      this.userService.deleteUser(this.selectedUser, this.authService.getToken() ?? '').subscribe(
        () => {
          this.getAllUser();
        },
        (error) => {
        }
      )
    }
  }


  //ADD USER-
  //MODEL USER INSERT
  newUser = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    role: 'admin'
  };

  addUser(): void {
    if (this.newUser.name === "" || this.newUser.password === "" || this.newUser.email === "") {
      this.errorMessage = 'Fields empty';
      // Hacer que el mensaje de error desaparezca después de 3 segundos
      this.cleanErrorMessages();
    } else {
      this.userService.createUser(this.newUser).subscribe(
        () => {
          this.sucessMessage = "Register successful";
          this.getAllUser();
          this.cleanSuccessMessages();
          this.closeAddModal();
        },
        (error) => {
          this.errorMessage = error.message.statusText || 'Invalid credentials or email exists';
          // Hacer que el mensaje de error desaparezca después de 3 segundos
          this.cleanErrorMessages();
        }
      )
    }
  }

  cleanSuccessMessages():void{
    setTimeout(() => {
      this.sucessMessage = '';
    }, 1500);
  }

  cleanErrorMessages():void{
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
