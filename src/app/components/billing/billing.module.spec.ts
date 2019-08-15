import { BillingModule } from './billing.module';

describe('BlankPageModule', () => {
  let userModule: BillingModule;

  beforeEach(() => {
    userModule = new BillingModule();
  });

  it('should create an instance', () => {
    expect(userModule).toBeTruthy();
  });
});
