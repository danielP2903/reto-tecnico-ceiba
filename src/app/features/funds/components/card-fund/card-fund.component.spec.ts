import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFundComponent } from './card-fund.component';

describe('CardFundComponent', () => {
  let component: CardFundComponent;
  let fixture: ComponentFixture<CardFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
