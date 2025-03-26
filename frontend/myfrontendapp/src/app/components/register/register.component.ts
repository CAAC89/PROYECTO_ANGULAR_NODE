import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  //VARIABLES---------------------------

  name: string = ''; // Declarar propiedad passwordail: string = ''; // Declarar propiedad email
  email: string = ''; // Declarar propiedad email
  password: string = ''; // Declarar propiedad password
  confirmpassword: string = ''; // Declarar propiedad password
  errorMessage = '';
  sucessMessage = '';


  //CONSTRUCTOR-------------------------------------
  constructor(private userService: UserService, private router: Router) { }

  //EVENT TO CLICK CREATE USER OR REGISTER

  onSubmit() {
    this.errorMessage = '';

    if(this.email==="" || this.name ==="" || this.password==="" || this.confirmpassword===""){
      this.errorMessage="Empty fields";
      this.cleanErrorMessages();
    }else{
      if(this.confirmpassword!==this.password){
        this.errorMessage="Password is not confirmed ";
        this.cleanErrorMessages();
      }else{
        this.userService.createUser({
          "name": this.name,
          "email": this.email,
          "password": this.password,
          "role": "user",
        }).subscribe({
          next: (response) => {
            this.errorMessage = "";
            this.sucessMessage = "Register successful";
            //Wait
            this.cleanSuccessMessages();
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = error.message.statusText || 'Invalid credentials';
            // Hacer que el mensaje de error desaparezca después de 3 segundos
            this.cleanErrorMessages();
          },
        });
      }
    }
  }

  //METHODS-----------------------------------
  cleanSuccessMessages():void{
    setTimeout(() => {
      this.name = '';
      this.password = '';
      this.confirmpassword = '';
      this.email = '';
      this.sucessMessage = '';
    }, 3000);
  }

  cleanErrorMessages():void{
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
