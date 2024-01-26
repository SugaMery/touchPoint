import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesStatusComponent } from './files-status.component';

describe('FilesStatusComponent', () => {
  let component: FilesStatusComponent;
  let fixture: ComponentFixture<FilesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilesStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
