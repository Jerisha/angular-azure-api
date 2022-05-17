import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted=false;
  returnUrl!: string;
  error = '';
  @Output() loginState =new EventEmitter<boolean>()
  @Output() logoutState =new EventEmitter<boolean>()
hide =true;
  

  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    
    

    ) {
      //   // redirect to home if already logged in
      //   if (this.authenticationService.currentUserValue) { 
      //     this.router.navigate(['/']);
      // }
     }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required)
  });
    
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';


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

    this.loading = true;
    // if(this.authenticationService.login(this.f.username.value, this.f.password.value))
    // {
      // this.router.navigate([this.returnUrl]);
      this.router.navigate(['/home']);
      this.loginState.emit(true)
      
      //alert( "Welcome back "+this.f.username.value);
    // }
     
        // .pipe(first())
        // .subscribe(
        //     data => {
        //         this.router.navigate([this.returnUrl]);
        //        // this.toastrservice.success(data.firstName + " " + data.lastName, "Welcome back");
        //        alert(data.firstName + " " + data.lastName);
        //     },
        //     error => {
        //         // this.toastrservice.error(error);
        //         alert(error)
        //         this.loading = false;
        //     });
}

 
  }


