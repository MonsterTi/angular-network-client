import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocPrincipalComponent } from './bloc-principal.component';

describe('BlocPrincipalComponent', () => {
  let component: BlocPrincipalComponent;
  let fixture: ComponentFixture<BlocPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
