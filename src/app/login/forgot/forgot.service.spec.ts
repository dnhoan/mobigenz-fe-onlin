/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ForgotService } from './forgot.service';

describe('Service: Forgot', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotService]
    });
  });

  it('should ...', inject([ForgotService], (service: ForgotService) => {
    expect(service).toBeTruthy();
  }));
});
