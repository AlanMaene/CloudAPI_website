import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCocktailsComponent } from './view-cocktails.component';

describe('ViewCocktailsComponent', () => {
  let component: ViewCocktailsComponent;
  let fixture: ComponentFixture<ViewCocktailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCocktailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCocktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
