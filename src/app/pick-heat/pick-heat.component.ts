import { Component, inject, Inject, OnInit, Optional } from '@angular/core';
import {
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialog as MatDialog,
} from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { pickSideDish } from '../actions/order.actions';
import { Meal } from '../interfaces/meal';
import { PickSideDishComponent } from '../pick-side-dish/pick-side-dish.component';
import { AreYouSureComponent } from '../are-you-sure/are-you-sure.component';

@Component({
  selector: 'app-pick-heat',
  templateUrl: './pick-heat.component.html',
  styleUrls: ['./pick-heat.component.css'],
})
export class PickHeatComponent implements OnInit {
  #store = inject(Store<any>);
  public chosenHeat = 0;
  public dish: Meal;
  constructor(
    public parentDialogRef: MatDialogRef<PickHeatComponent>,
    public childDialogRef: MatDialogRef<AreYouSureComponent>,
    private areYouSure: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dish = data.dish;
  }

  ngOnInit(): void {}

  heat(direction: string) {
    if (direction === '+') {
      if (this.chosenHeat < 1) {
        this.chosenHeat = this.chosenHeat + 1;
      } else {
        const childDialogRef = this.areYouSure.open(AreYouSureComponent);
        childDialogRef.afterClosed().subscribe((result) => {
          this.chosenHeat = this.chosenHeat + 1;
        });
      }
    } else {
      this.chosenHeat = this.chosenHeat - 1;
    }
  }

  cancel() {
    this.parentDialogRef.close();
  }

  order() {
    this.#store.dispatch(
      pickSideDish({ item: { ...this.dish, chosenHeat: this.chosenHeat } })
    );
    this.parentDialogRef.close();
  }
}
