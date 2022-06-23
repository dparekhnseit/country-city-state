import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

import { Country, State, City } from 'country-state-city';
import { finalize, takeUntil, timer } from 'rxjs';
import { Router } from '@angular/router';


// Import Interfaces`
// import { ICountry, IState, ICity } from 'country-state-city'

@Component({
  selector: 'app-country-city-state',
  templateUrl: './country-city-state.component.html',
  styleUrls: ['./country-city-state.component.scss']
})
export class CountryCityStateComponent implements OnInit {

  public countrySelected: any;
  public stateSelected: any;
  public citieSelected: any;
  countriesOptions: any[] = [];
  statesOptions: any[] = [];
  citiesOptions: any[] = [];



  form: FormGroup;

  country = new FormControl('', [Validators.required]);
  state = new FormControl({ value: '', disabled: true }, [
    Validators.required,
  ]);
  city = new FormControl({ value: '', disabled: true }, [
    Validators.required,
  ]);





  constructor(private apiService: ApiService, private router: Router) {
    this.form = new FormGroup({
      country: this.country,
      state: this.state,
      city: this.city,
    });
  }

  ngOnInit(): void {
    this.countriesOptions = Country.getAllCountries().map((c) => ({ name: c.name, id: c.isoCode }));

    this.country.valueChanges.subscribe((country) => {
      this.state.reset();
      this.state.disable();
      if (country) {
        this.apiService.country = country;
        this.statesOptions = State.getStatesOfCountry(country).map((c) => ({
          id: c.isoCode,
          name: c.name
        }))
        this.state.enable();
      }
    });

    this.state.valueChanges.subscribe((state) => {
      this.city.reset();
      this.city.disable();
      if (state) {
        this.apiService.state = state;
        this.citiesOptions = City.getCitiesOfState(this.country.value, state).map((c) => ({
          id: c.name,
          name: c.name
        }))
        this.city.enable();
      }
    });

    this.state.valueChanges.subscribe((city) => {
      if (city) {
        this.apiService.city = city
      }
    });
    if (this.apiService.country && this.apiService.state && this.apiService.city) {
      this.country.setValue(this.apiService.country);
      this.country.updateValueAndValidity();


      timer(1000).pipe(finalize(() => {
        this.state.setValue(this.apiService.state)
        this.state.updateValueAndValidity();
      })).subscribe()
      timer(2000).pipe(finalize(() => {
        this.city.setValue(this.apiService.city)
        this.city.updateValueAndValidity();
      })).subscribe()
    }

  }

  getCountryTitle(id: string) {
    if (this.country.value || id) {
      const searchString = this.country.value ? this.country.value : id
      return this.countriesOptions.find(c => c.id === searchString).name;
    }
    return
  }

  getStateTitle(id: string) {
    if ((this.state.value || id) && this.statesOptions?.length > 0) {
      const searchString = this.state.value ? this.state.value : id
      return this.statesOptions.find(c => c.id === searchString).name;
    }
    return
  }

  getCitiesTitle(id: string) {
    if ((this.city.value || id) && this.citiesOptions?.length > 0) {
      const searchString = this.city.value ? this.city.value : id
      return this.citiesOptions.find(c => c.id === searchString).name;
    }
    return
  }


  submit() {
    if (this.form.valid) {
      this.router.navigate(['/success'])
    }
  }

}
