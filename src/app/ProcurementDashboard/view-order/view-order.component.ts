import { Component, OnInit } from '@angular/core';
import { ProcurementService } from '../../services/procurement.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css',
})
export class ViewOrderComponent implements OnInit {
  orders: any[] = [];
  filterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private procurementService: ProcurementService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      status: [''],
      date: [''],
    });

    this.fetchOrders();

    this.filterForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.fetchOrders());
  }

  fetchOrders(): void {
    const { status, date } = this.filterForm.value;

    // Convert date to yyyy-MM-dd if available
    let formattedDate = '';
    if (date) {
      formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }

    this.procurementService.getFilteredOrders(status, formattedDate).subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error('Error fetching orders:', err),
    });
  }

  goToTrackOrder(id: number) {
    this.router.navigate(['/track-order', id]);
  }
}
