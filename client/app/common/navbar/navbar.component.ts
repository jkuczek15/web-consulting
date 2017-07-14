import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SharedModule } from '../../shared/shared.module';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  // Initialize view model variables
  private loggedIn;

  constructor(private authService: AuthService,
              private sharedModule: SharedModule) { }

  ngOnInit() {
    let self = this;
    // Function to be called each time the route changes
    this.sharedModule.onRouteChange(function() {
      self.loggedIn = self.authService.loggedIn();
    });
  }// end ngOnInit function

  logout() {
    this.loggedIn = false;
    this.authService.logout();
    return false;
  }// end logout function

}// end class NavBarComponent
