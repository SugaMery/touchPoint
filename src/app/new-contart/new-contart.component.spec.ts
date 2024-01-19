import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContartComponent } from './new-contart.component';

describe('NewContartComponent', () => {
  let component: NewContartComponent;
  let fixture: ComponentFixture<NewContartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewContartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewContartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
