import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeedsComponent } from './my-feeds.component';

describe('MyFeedsComponent', () => {
  let component: MyFeedsComponent;
  let fixture: ComponentFixture<MyFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
