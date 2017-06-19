import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerDocsComponent } from './inner-docs.component';

describe('InnerDocsComponent', () => {
  let component: InnerDocsComponent;
  let fixture: ComponentFixture<InnerDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
