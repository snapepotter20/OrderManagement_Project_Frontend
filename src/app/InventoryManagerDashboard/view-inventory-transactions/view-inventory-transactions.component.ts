import { Component } from '@angular/core';
import {
  InventoryService,
  InventoryTransaction,
} from '../../services/InventoryServices/inventory.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-inventory-transactions',
  imports: [RouterModule, CommonModule],
  templateUrl: './view-inventory-transactions.component.html',
  styleUrl: './view-inventory-transactions.component.css',
})
export class ViewInventoryTransactionsComponent {
  transactions: InventoryTransaction[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.inventoryService.getAllTransactions().subscribe({
      next: (data: any) => {
        this.transactions = data;
      },
      error: (err: any) => {
        console.error('Failed to fetch transactions', err);
      },
    });
  }

  // In your component.ts
  randomColorClasses = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-red-100 text-red-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-teal-100 text-teal-800',
    'bg-orange-100 text-orange-800',
  ];

  getRandomColor(index: number): string {
    return this.randomColorClasses[index % this.randomColorClasses.length];
  }
}
