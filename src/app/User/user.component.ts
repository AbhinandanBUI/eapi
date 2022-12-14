import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { ToasterService } from '../Service/Toaster/toaster.service';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  //   private source = interval(
  //     environment.corePingIntervalSeconds * 1000;
  //  );

  ngOnInit(): void {
    this.toast.loader();
  }
  private source = interval(30000);

  constructor(private _http: HttpClient, private token: TokenService,private toast:ToasterService) {
    this.toast.loader();
    this.source.subscribe(() => {
      this._http
        .get('https://ereportapi.herokuapp.com/', { observe: 'response' })
        .pipe(first())
        .subscribe(
          resp => {

            if (resp.status == 200) {
              console.log(true);

            } else {
              console.log(false);
              Swal.fire(
                'The Internet?',
                'That thing is still around?',
                'question'
              )
            }
          },
          err => {
            console.log(err)
            Swal.fire(
              'API  ERROR ?',
              'The api  is not running around?',
              'question'
            );
            // this.token.signout();
          }
        );
    });
  }
}
