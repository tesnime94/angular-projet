import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDressComponent } from './add-dress.component';

describe('AddDressComponent', () => {
  let component: AddDressComponent;
  let fixture: ComponentFixture<AddDressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
