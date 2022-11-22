import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/Service/master.service';
import { ToasterService } from 'src/app/Service/Toaster/toaster.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(private api: MasterService, private toast: ToasterService) {}

  registrationform = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  Registration() {
    const data = {
      first_name: this.registrationform.controls['fname'].value,
      last_name: this.registrationform.controls['lname'].value,
      email: this.registrationform.controls['email'].value,
      mobile: this.registrationform.controls['mobile'].value,
      password: this.registrationform.controls['password'].value,
      dob: this.registrationform.controls['dob'].value,
      roleId: 1,
    };
    this.api.post(data, 'user', 'addUser').subscribe({
      next: (response) => {
        if (response.success == true) {
          this.toast.SuccessMessage('Registration Success', 1000);
          this.registrationform.reset();
        } else {
          this.toast.WarningMessage(response.message, 2000);
        }
      },
      error: (err) => {
        this.toast.ErrorMessage(err.message, 1000);
      },
    });
    console.log(data);
  }
}
