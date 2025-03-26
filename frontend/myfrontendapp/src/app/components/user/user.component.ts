import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TableUserComponent } from '../table-user/table-user.component';

@Component({
  selector: 'app-user',
  imports: [HeaderComponent, TableUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
