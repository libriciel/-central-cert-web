import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlFormComponent } from './url-form.component';

describe('UrlFormComponent', () => {
  let component: UrlFormComponent;
  let fixture: ComponentFixture<UrlFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
