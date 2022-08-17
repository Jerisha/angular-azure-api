import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_auth/services/authentication.service';
import { AlertService } from '../_shared/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

  hide = true;



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService

  ) {
      // redirect to home if already logged in
    //   if (this.authService.isUserLoggedIn) { 
    //     this.router.navigate(['home']);
    // }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
   // this.authService.logoutUser();

  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // if(this.f.username.value === '')
    //    return alert("Provide your VF-Root Username");
    // if(this.f.password.value === '')
    //    return alert("Password is Empty");
    // // stop here if form is invalid
    // if (this.loginForm.invalid) {            
    //     return alert("Invalid Login Credentials",);
    // }
    debugger;
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
    // .subscribe((x: any) => {
    //   if (this.authService.isUserLoggedIn) {
    //     this.router.navigate([this.returnUrl]);
    //   }
    // },
    //   error => {
    //     console.log("login error" + error)
    //     this.loading = false;
    //   }
    // )

    .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    if (this.authService.isUserLoggedIn) 
                    this.router.navigateByUrl(this.returnUrl);
                },
                error: error => {
                    this.alertService.error(error);
                    // this.loading = false;
                }
              });
            
              

    
  }


}


