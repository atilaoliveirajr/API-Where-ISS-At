import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssPositionMapComponent } from './iss-position-map.component';

describe('IssPositionMapComponent', () => {
  let component: IssPositionMapComponent;
  let fixture: ComponentFixture<IssPositionMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssPositionMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssPositionMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
