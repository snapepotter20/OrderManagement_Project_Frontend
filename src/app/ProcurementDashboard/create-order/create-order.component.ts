import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProcurementService } from '../../services/procurement.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private procurementService: ProcurementService) {
    this.orderForm = this.fb.group({
      orderDate: ['', Validators.required],
      expectedDelivery: ['', Validators.required],
      deliveryStatus: ['Pending', Validators.required],
      items: this.fb.array([])
    });
  }

  get items() {
    return this.orderForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, Validators.required],
      cost: [0, Validators.required]
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  submitOrder() {
    const payload = this.orderForm.value;

    payload.items = payload.items.map((item: any) => ({
      product: { productId: item.productId },
      quantity: item.quantity,
      cost: item.cost
    }));

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

  resetForm() {
    this.orderForm.reset();
    this.orderForm.patchValue({ deliveryStatus: 'Pending' });
    this.items.clear();
  }
}
