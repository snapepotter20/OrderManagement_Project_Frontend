import { Component } from '@angular/core';
import { ProcurementService } from '../../services/procurement.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-completed-orders-component',
  imports: [CommonModule],
  templateUrl: './view-completed-orders-component.component.html',
  styleUrl: './view-completed-orders-component.component.css',
})
export class ViewCompletedOrdersComponent {
  completedOrders: any[] = [];
  isLoading = true;
  errorMessage = '';
  orderId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private procurementService: ProcurementService
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.procurementService.getFilteredOrders('DELIVERED', null).subscribe({
      next: (orders) => {
        this.completedOrders = orders;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load completed orders.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  downloadInvoicePdf(orderId: number): void {

    console.log("Inside downloadinvoicepdf");
    if (!orderId) return;

    this.procurementService.downloadInvoice(orderId).subscribe({
      next: (fileData) => {
        const blob = new Blob([fileData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice_order_${orderId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error: () => alert('❌ Failed to download invoice'),
    });
  }
}
