import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventoryTransactionComponent } from './create-inventory-transaction.component';

describe('CreateInventoryTransactionComponent', () => {
  let component: CreateInventoryTransactionComponent;
  let fixture: ComponentFixture<CreateInventoryTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInventoryTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInventoryTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
