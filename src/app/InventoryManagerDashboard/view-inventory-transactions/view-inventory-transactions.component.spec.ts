import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInventoryTransactionsComponent } from './view-inventory-transactions.component';

describe('ViewInventoryTransactionsComponent', () => {
  let component: ViewInventoryTransactionsComponent;
  let fixture: ComponentFixture<ViewInventoryTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewInventoryTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInventoryTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
