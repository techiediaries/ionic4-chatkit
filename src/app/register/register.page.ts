import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(form){
    console.log('register', form.value);
    this.authService.register(form.value).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl('login');
    });
  }

}
