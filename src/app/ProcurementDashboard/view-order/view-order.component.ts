import { Component, OnInit } from '@angular/core';
import { ProcurementService } from '../../services/procurement.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-view-order',
  standalone:true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private procurementService: ProcurementService, private router: Router) {}

  ngOnInit() {
    this.procurementService.getAllOrders().subscribe({
      next: (res) => this.orders = res,
      error: () => alert('Failed to load orders')
    });
  }
  goToTrackOrder(id: number) {
  this.router.navigate(['/track-order', id]);
}

}
