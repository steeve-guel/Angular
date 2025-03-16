import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlClassComponent } from './owl-class.component';

describe('OwlClassComponent', () => {
  let component: OwlClassComponent;
  let fixture: ComponentFixture<OwlClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwlClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
