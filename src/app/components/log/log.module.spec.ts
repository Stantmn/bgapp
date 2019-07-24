import { LogModule } from './log.module';

describe('LogModule', () => {
  let userModule: LogModule;

  beforeEach(() => {
    userModule = new LogModule();
  });

  it('should create an instance', () => {
    expect(userModule).toBeTruthy();
  });
});
