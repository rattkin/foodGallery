import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { changeMealFilter } from '../actions/order.actions';
import { selectFilterType, selectMealClasses } from '../state/selectors';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  #store = inject(Store<any>);
  public mealClasses = this.#store.pipe(select(selectMealClasses));

  public filterType = this.#store.pipe(select(selectFilterType));

  ngOnInit(): void {}

  select(filter: string) {
    this.#store.dispatch(changeMealFilter({ filterType: filter }));
  }
}
