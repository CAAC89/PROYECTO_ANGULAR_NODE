import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  //Variables-------------------
  status: number = 0;
  statusRoute: number|null = null;
  //-----------------------------


  //Construuctor-------------------
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }
  //-------------------------------


  //INIT METHOD START WHEN INITITAL PROCESS----------------
  ngOnInit(): void {
    this.initStatusRoute('/user', 1);
    this.initStatusRoute('/ticket', 2);

    this.userService.getUser(this.authService.getEmail() ?? '', this.authService.getToken() ?? '').subscribe(
      (response) => {
        // Usando forEach para recorrer el arreglo
        response.filter((item: any) => item.email === this.authService.getEmail()).forEach((item: any) => {
          if ('admin' === item.role) {
            this.status = 1;
          }
          else if ('user' === item.role) {
            this.status = 2;
          }
        });
      },
      (error) => {
        this.status = 0;
        this.logout();
      }
    );
  }

  //METHODS--------------

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  initStatusRoute(route:string, position:number):void{
    if (this.router.url.includes(route)) {
      this.statusRoute=position;
    } 
  }
}
