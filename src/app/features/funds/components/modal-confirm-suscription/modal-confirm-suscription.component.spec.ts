import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmSuscriptionComponent } from './modal-confirm-suscription.component';

describe('ModalConfirmSuscriptionComponent', () => {
  let component: ModalConfirmSuscriptionComponent;
  let fixture: ComponentFixture<ModalConfirmSuscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmSuscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmSuscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
