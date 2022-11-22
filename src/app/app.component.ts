import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { first, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { TokenService } from './Service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UI2.0';

  
 
}

