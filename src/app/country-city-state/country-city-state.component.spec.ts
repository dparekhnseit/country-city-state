import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCityStateComponent } from './country-city-state.component';

describe('CountryCityStateComponent', () => {
  let component: CountryCityStateComponent;
  let fixture: ComponentFixture<CountryCityStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCityStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCityStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
