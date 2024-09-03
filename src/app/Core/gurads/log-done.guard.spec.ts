import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logDoneGuard } from './log-done.guard';

describe('logDoneGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logDoneGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
