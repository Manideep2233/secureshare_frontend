import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContComponent } from './dialog-cont.component';

describe('DialogContComponent', () => {
  let component: DialogContComponent;
  let fixture: ComponentFixture<DialogContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
