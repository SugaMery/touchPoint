import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContartComponent } from './list-contart.component';

describe('ListContartComponent', () => {
  let component: ListContartComponent;
  let fixture: ComponentFixture<ListContartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListContartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListContartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
