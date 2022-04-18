import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmExchangesComponent } from './confirm-exchanges.component';

describe('ConfirmExchangesComponent', () => {
  let component: ConfirmExchangesComponent;
  let fixture: ComponentFixture<ConfirmExchangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmExchangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
