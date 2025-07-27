// Add to imports
import { Component } from '@angular/core';
import { ProcurementService } from '../../services/procurement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-requested-orders-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-requested-orders-component.component.html',
  styleUrl: './view-requested-orders-component.component.css',
})
export class ViewRequestedOrdersComponent {
  requestedOrders: any[] = [];
  otpMap: { [orderId: number]: string } = {};
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor(private procurementService: ProcurementService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.procurementService.getFilteredOrders('', null).subscribe({
      next: (orders) => {
        this.requestedOrders = orders.filter(
          (order) =>
            order.deliveryStatus === 'PENDING' ||
            order.deliveryStatus === 'DISPATCHED'
        );
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load requested orders.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  dispatchOrder(orderId: number): void {
    this.procurementService.updateOrderStatus(orderId, 'DISPATCHED').subscribe({
      next: (updatedOrder) => {
        this.successMessage = `Order ${orderId} dispatched successfully. OTP: ${updatedOrder.deliveryOtp}`;
        const order = this.requestedOrders.find(
          (o) => o.purchaseOrderId === orderId
        );
        if (order) {
          order.deliveryStatus = 'DISPATCHED';
        }
      },
      error: (err) => {
        this.errorMessage = `Failed to dispatch order ${orderId}: ${err.error}`;
        console.error(err);
      },
    });
  }

  deliverOrder(orderId: number): void {
    const otp = this.otpMap[orderId];
    if (!otp) {
      alert('Please enter OTP to deliver this order.');
      return;
    }

    this.procurementService
      .updateOrderStatus(orderId, 'DELIVERED', otp)
      .subscribe({
        next: (updatedOrder) => {
          this.successMessage = `Order ${orderId} marked as delivered.`;
          this.requestedOrders = this.requestedOrders.filter(
            (o) => o.purchaseOrderId !== orderId
          );
          // Optionally reload orders or trigger refresh in completed orders
        },
        error: (err) => {
          alert(`Failed to deliver order: ${err.error}`);
          console.error(err);
        },
      });
  }
}
