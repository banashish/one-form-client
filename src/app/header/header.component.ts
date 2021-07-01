import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../users/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userSignedIn: Boolean

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSignedIn = this.authService.checkSignedIn();
  }

  register(){
    this.router.navigate(['register'])
  }

  signin(){
    this.router.navigate(['signin'])
  }

  goToHome(){
    this.router.navigate(['/'])
  }

  logout(){
    this.authService.logout();
    this.userSignedIn = this.authService.checkSignedIn();
    this.router.navigate(['signin'])
  }

}
