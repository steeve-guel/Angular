import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailsClassComponent } from './dialog-details-class.component';

describe('DialogDetailsClassComponent', () => {
  let component: DialogDetailsClassComponent;
  let fixture: ComponentFixture<DialogDetailsClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDetailsClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDetailsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
