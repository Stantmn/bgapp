import { ProductModule } from './product.module';

describe('BlankPageModule', () => {
  let orderModule: ProductModule;

  beforeEach(() => {
    orderModule = new ProductModule();
  });

  it('should create an instance', () => {
    expect(orderModule).toBeTruthy();
  });
});
