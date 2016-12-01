//These first 3 lines will be deprecated by the final release
import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {OnDestroy} from "@angular/core";
import { Oauth2Service } from '../../../oauth2/oauth2.service';
import {PlatformLocation} from "@angular/common";
import {UIROUTER_DIRECTIVES} from "ui-router-ng2";
import {Observable} from 'rxjs/Observable';
import {State} from "ui-router-ng2";





@Component({
    selector: 'navbar',
    template: `
    <nav class="navbar navbar-fixed-top navbar-dark bg-success navbar-static-top">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
            &#9776;
        </button>
        <div class="collapse navbar-toggleable-xs" id="collapsingNavbar">
            
            <ul class="nav navbar-nav">
                <li class="nav-item">
                     

                       <a uiSref="public" uiSrefActive="active" class="nav-link btn btn-success-outline">Public</a>
                </li>
                <li class="nav-item">
                <!-- @TODO: put disabled button back in instead of anchor: [disabled]="!authenticated"-->
                   <a uiSref="protected" uiSrefActive="active"  class="nav-link btn btn-success-outline">Protected</a>
                </li>
            </ul>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <button *ngIf="!authenticated" (click)="doLogin()" class="nav-link btn btn-danger-outline" href="#">Login</button>
                    <button *ngIf="authenticated" (click)="doLogout()" class="nav-link btn btn-success-outline" href="#">Logout {{userName}}</button>
                </li>
            </ul>
        </div>
    </nav>
    `


})
export class Navbar  implements OnInit {
    public loggedin : Boolean= false;


  // Injects the service into the component
    constructor(private oAuthService: Oauth2Service, private location: PlatformLocation,
    state: State) {
      /*   const fragment: Observable<string> = state.
    fragment.subscribe(params => {
        let accessToken: string = window.location.hash;
        let token: string = accessToken.match(/^(.*?)&/)[1].replace('#access_token=', '');*/
       // console.debug("la garcha paso por aca....");
  };

     

    ngOnInit() {
        // At load, tries to login (If contains fragments with "access_token")
        this.oAuthService.tryLogin();
    }

 
    doLogin() {
        this.oAuthService.login();

    }

    doLogout() {
        this.oAuthService.logout();
    }


    get authenticated() : Boolean {
         return  (this.oAuthService.getToken().get()!=null);
    }

}

