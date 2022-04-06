import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBookComponent } from './upload-book.component';

describe('UploadBookComponent', () => {
  let component: UploadBookComponent;
  let fixture: ComponentFixture<UploadBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
