import { StoreModule } from './store.module';

describe('BlankPageModule', () => {
  let userModule: StoreModule;

  beforeEach(() => {
    userModule = new StoreModule();
  });

  it('should create an instance', () => {
    expect(userModule).toBeTruthy();
  });
});
