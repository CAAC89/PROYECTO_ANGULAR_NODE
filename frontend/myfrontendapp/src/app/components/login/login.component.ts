import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //VARIABLES-----------------------------
  email: string = ''; // Declarar propiedad email
  password: string = ''; // Declarar propiedad password
  errorMessage = '';
  sucessMessage = '';


  //CONSTRUCTOR---------------------------
  constructor(private authService: AuthService, private router: Router) { }

  //EVENT TO CLICK LOGIN
  onSubmit() {
    this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.errorMessage = "";
        //save the token
        this.authService.saveToken(response.token);
        //Save local storage email
        this.authService.saveEmail(this.email);

        this.sucessMessage = "Login successful";
        //Wait
        this.cleanSuccessMessages();

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.message.statusText || 'Invalid credentials';
        // Hacer que el mensaje de error desaparezca después de 3 segundos
        this.cleanErrorMessages();
      },
    });
  }

  //METHODS-----------------------------------
  cleanSuccessMessages():void{
    setTimeout(() => {
      this.sucessMessage = '';
    }, 3000);
  }

  cleanErrorMessages():void{
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
