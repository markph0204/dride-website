import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualSetupComponent } from './manual-setup.component';

describe('ManualSetupComponent', () => {
  let component: ManualSetupComponent;
  let fixture: ComponentFixture<ManualSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
