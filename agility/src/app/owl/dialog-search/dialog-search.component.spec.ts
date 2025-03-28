import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchComponent } from './dialog-search.component';

describe('DialogSearchComponent', () => {
  let component: DialogSearchComponent;
  let fixture: ComponentFixture<DialogSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
