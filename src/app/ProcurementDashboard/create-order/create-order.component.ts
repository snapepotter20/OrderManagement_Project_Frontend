import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProcurementService } from '../../services/procurement.service';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private procurementService: ProcurementService
  ) {
    this.orderForm = this.fb.group({
      orderDate: ['', Validators.required],
      expectedDelivery: ['', Validators.required],
      deliveryStatus: ['Pending', Validators.required],
      items: this.fb.array([this.createItemGroup()]) // Add one by default
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  createItemGroup(): FormGroup {
    return this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      cost: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addItem(): void {
    this.items.push(this.createItemGroup());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  submitOrder(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.orderForm.value,
      items: this.orderForm.value.items.map((item: any) => ({
        product: { productId: item.productId },
        quantity: item.quantity,
        cost: item.cost
      }))
    };

    this.procurementService.createOrder(payload).subscribe({
      next: () => {
        alert('✅ Order created successfully!');
        this.resetForm();
      },
      error: () => {
        alert('❌ Error creating order');
      }
    });
  }

  resetForm(): void {
    this.orderForm.reset();
    this.orderForm.patchValue({ deliveryStatus: 'Pending' });
    this.items.clear();
    this.addItem(); // Reset with one item
  }
}
