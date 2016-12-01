import {AppComponent} from "./app.component";
import {PublicPage} from "./components/pages/public-page";
import {ProtectedPage} from "./components/pages/protected-page";
import {UrlMatcherFactory} from "ui-router-ng2";

export class States{






  static defaultState = { name: 'app', url: '', component: PublicPage,
  
  
  onEnter: function($state) {
       if (location.hash) {
            console.debug("no funca ni en pedo");
            $state.go('state', {param1: $state.params.param1, param2: location.hash})
        }
    }
}; 
  static publicState = { name: 'public', url: '/public', component: PublicPage }; 
  static protectedState = { name: 'protected', url: '/protected',  component: ProtectedPage };
  
  
  



}