import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {RouterModule, Routes, ExtraOptions} from "@angular/router";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {PublicPage} from "./components/pages/public-page";
import {ProtectedPage} from "./components/pages/protected-page";
import {HttpModule} from "@angular/http";
import {Navbar} from "./components/navbar/navbar";
import {GridDemo} from "./components/grid/grid-demo";
import {Grid} from "./components/grid/grid";
import { States } from './app.routes';
import { Oauth2Service } from '../oauth2/oauth2.service';
import { OAUTH2_PROVIDERS } from '../oauth2/ng2-oauth2';
import {UIRouterModule} from "ui-router-ng2";
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UrlMatcherFactory} from "ui-router-ng2";
import {trace} from "ui-router-ng2";
import {TransitionService} from "ui-router-ng2";
import {HookMatchCriteria} from "ui-router-ng2";
import {Transition} from "ui-router-ng2";
import {TransitionHookFn} from "ui-router-ng2";
import {HookResult} from "ui-router-ng2";
import {UrlMatcher} from "ui-router-ng2";
import {ParamTypes} from "ui-router-ng2";
import {MyUIRouterConfig} from "./MyUIRouterConfig";
import {AccordionModule} from "./components/ng2-accordion";
import {Ng2PaginationModule} from "./components/ng2-pagination";




//trace.enable(1,2,3,4,5);



@NgModule({
    declarations: [AppComponent, PublicPage, ProtectedPage, 
    Navbar, GridDemo,Grid],
    providers: [
        OAUTH2_PROVIDERS,
        {provide: 'Window', useValue: window}

    ],
    imports: [
        HttpModule,
        BrowserModule,
        AccordionModule,
        Ng2PaginationModule,
            UIRouterModule.forRoot({
                states: [ States.publicState,States.protectedState,
                States.defaultState ],     
                      configClass: MyUIRouterConfig, useHash: true
                      
 })],
    bootstrap: [AppComponent]
})

export class AppModule {

    private authorizedsuscription;
    private profilesuscription;
    private loggedoutsuscription;

    public profile = {};


    constructor (transitionService : TransitionService){
       let hash:String = window.location.hash;
       if ( hash.indexOf("#access_token") != -1 )    {
           let loc:string =  window.location.toString();
           let target:string;
           target = loc.replace("/#access_token","?access_token");
           window.location.replace(target);
        } 
       

        console.debug("HASH...." +  window.location.hash);

        transitionService.onBefore(
            { to: '' 
            }, 
            
            (trans: Transition) =>{
               
                //trans.router.stateService.target("protected");
                return true;
            });

                // Suscribe to interesting events
        this.authorizedsuscription= Oauth2Service.Authorized.subscribe(item => {
            console.log('Authorized event captured ', item.token);
         
            
        });
        this.loggedoutsuscription = Oauth2Service.LoggedOut.subscribe(item => {
            console.log('Logged out event captured');
         
            this.profile = {};
        });
        this.profilesuscription =  Oauth2Service.Profile.subscribe(item => {
            console.log('Profile event captured');
            this.profile = item.profile;
        });

       

        
    }

     




}
platformBrowserDynamic().bootstrapModule(AppModule);

