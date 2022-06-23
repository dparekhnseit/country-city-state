import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-country-city-state',
  templateUrl: './country-city-state.component.html',
  styleUrls: ['./country-city-state.component.scss']
})
export class CountryCityStateComponent implements OnInit {

  myControl = new FormControl('');
  countries: string[] = ['India', 'USA', 'UK'];
  states: string[] = ['Maharashtra ', 'Goa', 'Kerala'];

  

  constructor() { }

  ngOnInit(): void {
  }

}
