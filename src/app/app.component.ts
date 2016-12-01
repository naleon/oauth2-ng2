import {Component} from "@angular/core";
//import 'rxjs/Rx'; // this would import all RxJS operators
import "rxjs/add/operator/map";

import { Oauth2Service } from '../oauth2/oauth2.service';



@Component({
    selector: 'app',
    template: `


<ui-view></ui-view>


`
})
export class AppComponent {

  
  constructor(private oauth2service: Oauth2Service) {
        this.oauth2service.init({
           /* Here your oauth config */ 
        });

      
    }

    

}


