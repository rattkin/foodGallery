import * as fromOrder from './order.actions';

describe('loadOrders', () => {
  it('should return an action', () => {
    expect(fromOrder.showOrder().type).toBe('showOrder');
  });
});
