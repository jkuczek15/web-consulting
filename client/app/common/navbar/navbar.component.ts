import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouteHelper } from '../../../includes/utils/route-helper.module';
import 'rxjs/add/operator/filter';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  // Initialize view model variables
  public loggedIn;
  private activeNavID;

  constructor(private authentication: AuthService,
              private routeControl: RouteHelper) { }

  ngOnInit() {
    let self = this;
    this.activeNavID = 'home-link';
  
    // Function to be called each time the route changes
    this.routeControl.onRouteChange(function(data) {
      self.loggedIn = self.authentication.loggedIn();
      if(data.id !== 1) {
        // dont call this function when the route is initialized
        self.removeActive(self.activeNavID);
      }// end if the route was just initialized
    });
  }// end ngOnInit function

  ngAfterViewInit(){
    this.addActive(this.activeNavID);
  }// end ngAfterViewInit function

  postScroll(id, reachedTarget) {
    // called each time user clicks link and scrolls to section
    if(reachedTarget) {
       this.removeActive(this.activeNavID);
       this.addActive(id);
    }// end if they reached the scroll position
  }// end function postScroll

  addActive(id) {
    $('#' + id).addClass("active");
    this.activeNavID = id;
  }// end function addActive

  removeActive(id) {
    $('#' + id).removeClass("active");
    this.activeNavID = null;
  }// end function removeActive

  logout() {
    this.loggedIn = false;
    this.authentication.logout();
    return false;
  }// end logout function

}// end class NavBarComponent
