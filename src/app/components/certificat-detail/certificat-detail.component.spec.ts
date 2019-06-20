import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatDetailComponent } from './certificat-detail.component';

describe('CertificatDetailComponent', () => {
  let component: CertificatDetailComponent;
  let fixture: ComponentFixture<CertificatDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
