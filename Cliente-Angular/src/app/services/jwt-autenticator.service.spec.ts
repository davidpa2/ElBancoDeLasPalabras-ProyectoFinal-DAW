import { TestBed } from '@angular/core/testing';

import { JwtAutenticatorService } from './jwt-autenticator.service';

describe('JwtAutenticatorService', () => {
  let service: JwtAutenticatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtAutenticatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
