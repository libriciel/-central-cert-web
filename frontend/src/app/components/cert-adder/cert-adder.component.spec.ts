import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertAdderComponent } from './cert-adder.component';

describe('CertAdderComponent', () => {
  let component: CertAdderComponent;
  let fixture: ComponentFixture<CertAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
