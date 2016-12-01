import {UIRouter} from "ui-router-ng2";
import {Transition} from "ui-router-ng2";
import { Injectable }     from '@angular/core';
import { States } from './app.routes';
import { State } from 'ui-router-ng2';


@Injectable()
export class MyUIRouterConfig {
  // The constructor may be injected
  constructor(uiRouter: UIRouter) {
    const requireAuthentication = (transition: Transition) => {
      let injector = transition.injector();
      console.log ("MyrouterConfig construido");
   }  
    
    let builtInStringType = uiRouter.urlMatcherFactory.type('string');
    let hashType = Object.assign({}, builtInStringType, { 
      encode: (str) => str, 
      decode: (str) => str, 


  });
    uiRouter.urlMatcherFactory.type('hashType', hashType);
  }
}