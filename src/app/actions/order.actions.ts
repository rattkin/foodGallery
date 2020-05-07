import { createAction, props } from '@ngrx/store';
import { Meal } from '../interfaces/meal';

export const pickSideDish = createAction(
  'pickSideDish',
  props<{ item: Meal; itemType: string }>()
);

export const showOrder = createAction(
  'showOrder',
);

export const changeMealFilter = createAction(
  'changeMealFilter',
  props<{ filterType: string; }>()
);

export const addToOrderWithSideDish = createAction(
  'addToOrderWithSideDish',
  props<{ item: Meal; sideDish: Meal; }>()
);

export const addToOrderWithoutSideDish = createAction(
  'addToOrderWithoutSideDish',
  props<{ item: Meal; }>()
);

export const removeFromOrder = createAction(
  'removeFromOrder',
  props<{ item: number; }>()
);

export const confirmOrder = createAction(
  'confirmOrder',
  props<{
    name: string;
    phone: string;
    time: string;
    comment: string;
  }>(),
);

export const sendOrder = createAction(
  'sendOrder',
);

export const OrderSuccess = createAction(
  'OrderSuccess',
);
export const OrderFailed = createAction(
  'OrderFailed',
);


