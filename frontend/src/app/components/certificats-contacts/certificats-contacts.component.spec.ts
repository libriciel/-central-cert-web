import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatsContactsComponent } from './certificats-contacts.component';

describe('CertificatsContactsComponent', () => {
  let component: CertificatsContactsComponent;
  let fixture: ComponentFixture<CertificatsContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatsContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatsContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
