import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateStarsComponent } from './rate-stars.component';

describe('RateStarsComponent', () => {
  let component: RateStarsComponent;
  let fixture: ComponentFixture<RateStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
