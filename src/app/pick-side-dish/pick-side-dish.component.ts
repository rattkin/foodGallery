import { Component, Inject, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { select, Store } from '@ngrx/store';
import { addToOrderWithSideDish } from '../actions/order.actions';
import { Meal } from '../interfaces/meal';
import { selectShowPackaging, selectSideDishes } from '../state/selectors';

// declare ga as a function to set and sent the events
declare let gtag: Function;

@Component({
  selector: 'app-pick-side-dish',
  templateUrl: './pick-side-dish.component.html',
  styleUrls: ['./pick-side-dish.component.css']
})
export class PickSideDishComponent implements OnInit {
  public sideDishes = this.store.pipe(select(selectSideDishes));
  public showPackaging = this.store.pipe(select(selectShowPackaging));
  public chosenSideDish: Meal;
  public dish: Meal;
  public sideForm: UntypedFormGroup;


  constructor(
    private store: Store<any>,
    private formBuilder: UntypedFormBuilder,
    public DialogRef: MatDialogRef<PickSideDishComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dish = data.dish;
  }

  ngOnInit(): void {
    gtag('send', 'pageview');


    this.sideForm = this.formBuilder.group({
      formSideRadio: ['', [
        Validators.required,
      ]],
    });
  }

  onSubmit() {
    if (!this.sideForm.valid) {
      this.sideForm.markAllAsTouched();
      return;
    } // stop here if form is invalid or pending
    this.store.dispatch(addToOrderWithSideDish({
      item: this.dish,
      sideDish: this.formSideRadio.value,
    }));
    this.DialogRef.close();
  }

  public get formSideRadio() { return this.sideForm.get('formSideRadio'); }

  checkClose() {
    this.DialogRef.close();
  }

}
