import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieDetailesComponent } from './categorie-detailes.component';

describe('CategorieDetailesComponent', () => {
  let component: CategorieDetailesComponent;
  let fixture: ComponentFixture<CategorieDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieDetailesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorieDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
