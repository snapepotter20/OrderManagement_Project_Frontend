import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CreateOrderComponent } from '../../ProcurementDashboard/create-order/create-order.component';
import { ViewOrderComponent } from '../../ProcurementDashboard/view-order/view-order.component';
import { AuthService } from '../../services/auth.service';
import { CreateInventoryTransactionComponent } from '../create-inventory-transaction/create-inventory-transaction.component';
import { ViewInventoryTransactionsComponent } from '../view-inventory-transactions/view-inventory-transactions.component';
import { ViewAllProductsComponent } from '../view-all-products/view-all-products.component';
import { TabService } from '../../services/InventoryServices/tab.service';
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-inventorydashboard',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CreateInventoryTransactionComponent,
    ViewInventoryTransactionsComponent,
    ViewAllProductsComponent,
    ProfileComponent
],
  templateUrl: './inventorydashboard.component.html',
  styleUrl: './inventorydashboard.component.css',
})
export class InventorydashboardComponent implements OnInit {
  selectedTab: 'create' | 'view' | 'products' | 'profile' = 'create';

  constructor(private tabService: TabService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tabService.selectedTab$.subscribe((tab) => {
      this.selectedTab = tab as any;
      this.cdr.detectChanges(); 
    });
  }
}
