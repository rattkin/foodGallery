import { Component, inject, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectLocation } from '../state/selectors';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  FormBuilder,
} from '@angular/forms';
import { AllowedLocations } from '../config';
import { changeLocation } from '../actions/order.actions';

@Component({
  selector: 'app-location-pick',
  templateUrl: './location-pick.component.html',
  styleUrls: ['./location-pick.component.scss'],
})
export class LocationPickComponent implements OnInit {
  #store = inject(Store<any>);
  #formBuilder = inject(FormBuilder);
  public selectLocation = this.#store.pipe(select(selectLocation));

  public locationForm: UntypedFormGroup = this.#formBuilder.group({
    location: [''],
  });
  public AllowedLocations = AllowedLocations;
  public get location() {
    return this.locationForm.get('location');
  }

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.selectLocation.subscribe((location) =>
      this.locationForm.controls.location.setValue(location)
    );
  }
  locationChange() {
    this.#store.dispatch(changeLocation({ location: this.location.value }));
  }
}
