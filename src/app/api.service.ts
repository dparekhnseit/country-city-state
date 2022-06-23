import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  country: string = "";
  state: string = "";
  city: string = "";
  constructor() { 
  }
}
