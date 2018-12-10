// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the AccidentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccidentProvider {

  accidentTypes = [
    {
      name: 'Vehicle Crashed',
      code: '001'
    },
    {
      name: 'Vehicle vs Vehicle Collision',
      code: '002'
    },
    {
      name: 'Vehicle Overturned',
      code: '003'
    },
    {
      name: 'Vehicle vs Pedestrian Collision',
      code: '004'
    }
]

  constructor() {
    console.log('Hello AccidentProvider Provider');
  }

  getAccidentTypes(){
    return of(this.accidentTypes);
  }

}
