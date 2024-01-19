import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonnesBancairesComponent } from './coordonnes-bancaires.component';

describe('CoordonnesBancairesComponent', () => {
  let component: CoordonnesBancairesComponent;
  let fixture: ComponentFixture<CoordonnesBancairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoordonnesBancairesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordonnesBancairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
