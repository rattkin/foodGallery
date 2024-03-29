import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { changeMealFilter, changeOrderMethod } from '../actions/order.actions';
// tslint:disable-next-line: max-line-length
import {
  AllowedOrderMethods,
  allowOrder,
  dayFormat,
  endDay,
  endMenuDay,
  endMenuTime,
  endTime,
  startDay,
  startMenuDay,
  startMenuTime,
  startTime,
  timeFormat,
} from '../config';
import {
  selectFilterType,
  selectMealClasses,
  selectOrderMethod,
} from '../state/selectors';
import {
  isAfterClose,
  isBeforeOpen,
  isClosedDay,
  isMenu,
  isOpen,
  isUntilMenuEnd,
} from '../utils/date';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  #store = inject(Store<any>);
  #formBuilder = inject(FormBuilder);
  public mealClasses = this.#store.pipe(select(selectMealClasses));
  public filterType = this.#store.pipe(select(selectFilterType));
  public selectOrderMethod = this.#store.pipe(select(selectOrderMethod));
  public openingTime = moment(startTime).format(timeFormat);
  public closingTime = moment(endTime).format(timeFormat);
  public openingMenuTime = moment(startMenuTime).format(timeFormat);
  public closingMenuTime = moment(endMenuTime).format(timeFormat);
  public startDay = moment(startDay).format(dayFormat);
  public endDay = moment(endDay).format(dayFormat);
  public startMenuDay = moment(startMenuDay).format('dd');
  public endMenuDay = moment(endMenuDay).format('dd');
  public isOpen = isOpen(moment());
  public isMenu = isMenu(moment());
  public isUntilMenu = isUntilMenuEnd(moment());
  public isBeforeOpen = isBeforeOpen(moment());
  public isClosedDay = isClosedDay(moment());
  public isAfterClose = isAfterClose(moment());
  public orderForm: UntypedFormGroup = this.#formBuilder.group({
    orderMethod: [''],
  });
  public allowOrder = allowOrder;

  public AllowedOrderMethods = AllowedOrderMethods;

  public get orderMethod() {
    return this.orderForm.get('orderMethod');
  }

  constructor(private formBuilder: UntypedFormBuilder) {}
  ngOnInit(): void {
    this.selectOrderMethod.subscribe((method) =>
      this.orderForm.controls.orderMethod.setValue(method)
    );
  }

  methodChange() {
    this.#store.dispatch(
      changeOrderMethod({ orderMethod: this.orderMethod.value })
    );
  }

  select(filter: string) {
    this.#store.dispatch(changeMealFilter({ filterType: filter }));
  }
}
