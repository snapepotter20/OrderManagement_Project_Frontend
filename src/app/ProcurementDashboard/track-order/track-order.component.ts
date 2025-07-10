import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';
import { ProcurementService } from '../../services/procurement.service';

@Component({
  selector: 'app-track-order',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css',
})
export class TrackOrderComponent {
    orderId: number = 0;
  orderDetails: any;
  trackingDetails: any;
  trackingStages = ['Ordered', 'Packed', 'Dispatched', 'Out for Delivery', 'Delivered'];
  currentStepIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private procurementService: ProcurementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));

    this.procurementService.getOrderById(this.orderId).subscribe({
      next: (res: any) => {
        this.orderDetails = res;
        this.setTrackingStageFromStatus(res.deliveryStatus);
      },
      error: () => alert('Failed to fetch order details'),
    });

    this.procurementService.getDeliveryTrackingByOrderId(this.orderId).subscribe({
      next: (res: any) => {
        this.trackingDetails = res;
        this.setTrackingStageFromStatus(res.status); // update stage based on tracking status
      },
      error: () => console.warn('No tracking data found'),
    });
  }

  setTrackingStageFromStatus(status: string) {
    const index = this.trackingStages.findIndex(stage => stage.toLowerCase() === status.toLowerCase());
    this.currentStepIndex = index >= 0 ? index : 0;
  }

  goBack() {
    this.router.navigate(['/procurement-dashboard']);
  }
}
