import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrideCloudComponent } from './dride-cloud.component';

describe('DrideCloudComponent', () => {
  let component: DrideCloudComponent;
  let fixture: ComponentFixture<DrideCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrideCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrideCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
