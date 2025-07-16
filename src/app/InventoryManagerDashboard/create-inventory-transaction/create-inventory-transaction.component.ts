// import { Component, OnInit } from '@angular/core';
// import { InventoryService, InventoryTransaction } from '../../services/InventoryServices/inventory.service';
// import { ProductService } from '../../services/product.service';
// import { FormArray, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { TabService } from '../../services/InventoryServices/tab.service';
// import { ChangeDetectorRef } from '@angular/core';


// @Component({
//   selector: 'app-create-inventory-transaction',
//   standalone: true,
//   imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
//   templateUrl: './create-inventory-transaction.component.html',
//   styleUrl: './create-inventory-transaction.component.css'
// })
// export class CreateInventoryTransactionComponent implements OnInit {
//   transactionForm!: FormGroup;
//   allProducts: any[] = [];
//   successMessage = '';
//   errorMessage = '';

//   constructor(
//     private fb: FormBuilder,
//     private inventoryService: InventoryService,
//     private productService: ProductService,
//     private tabService: TabService,
//     private router: Router,
//      private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.transactionForm = this.fb.group({
//       userId: [1, Validators.required],  // This can be dynamically set if required
//       transactionDate: ['', Validators.required],
//       transactionType: ['IN', Validators.required],
//       quantity: [0, [Validators.required, Validators.min(1)]],
//       reference: [''],
//       products: this.fb.array([])
//     });

//     this.fetchProducts();
//   }

//   get products(): FormArray {
//     return this.transactionForm.get('products') as FormArray;
//   }

//   fetchProducts(): void {
//     this.productService.getAllProducts().subscribe({
//       next: (data) => {
//         this.allProducts = data;
//       },
//       error: (err) => {
//         console.error('Failed to fetch products', err);
//       }
//     });
//   }

//   toggleProductSelection(productId: number, productName: string, event: any): void {
//     if (event.target.checked) {
//       this.products.push(this.fb.group({ productId, productName }));
//     } else {
//       const index = this.products.controls.findIndex(
//         (ctrl) => ctrl.value.productId === productId
//       );
//       if (index >= 0) this.products.removeAt(index);
//     }
//   }

//   submit(): void {
//     if (this.transactionForm.invalid || this.products.length === 0) {
//       this.errorMessage = 'Please fill all fields and select at least one product.';
//       return;
//     }

//     const payload: InventoryTransaction = this.transactionForm.getRawValue();
//     this.inventoryService.createTransaction(payload).subscribe({
//       next: () => {
//         this.successMessage = 'Transaction created successfully!';
//         this.errorMessage = '';
//         this.transactionForm.reset();
//         this.products.clear();

//         this.tabService.setTab('view');
//         //  setTimeout(() => this.cdr.detectChanges(), 0);
//       },
//       error: (err: any) => {
//         this.errorMessage = 'Failed to create transaction.';
//         this.successMessage = '';
//         console.error(err);
//       }
//     });
//   }
// }


import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InventoryService, InventoryTransaction } from '../../services/InventoryServices/inventory.service';
import { ProductService } from '../../services/product.service';
import { TabService } from '../../services/InventoryServices/tab.service';

@Component({
  selector: 'app-create-inventory-transaction',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-inventory-transaction.component.html',
  styleUrl: './create-inventory-transaction.component.css'
})
export class CreateInventoryTransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  allProducts: any[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private productService: ProductService,
    private tabService: TabService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      userId: [1, Validators.required],
      transactionDate: ['', Validators.required],
      transactionType: ['OUT', Validators.required],
      reference: [''],
      products: this.fb.array([]),
      quantity: [0]
    });

    this.fetchProducts();
  }

  // get products(): FormArray {
  //   return this.transactionForm.get('products') as FormArray;
  // }

  get products(): FormArray<FormGroup> {
  return this.transactionForm.get('products') as FormArray<FormGroup>;
}

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => (this.allProducts = data),
      error: (err) => console.error('Failed to fetch products', err)
    });
  }

  toggleProductSelection(productId: number, productName: string, event: any): void {
    if (event.target.checked) {
      this.products.push(
        this.fb.group({
          productId,
          productName,
          transactionQuantity: [1, [Validators.required, Validators.min(1)]]
        })
      );
    } else {
      const index = this.products.controls.findIndex(
        (ctrl) => ctrl.value.productId === productId
      );
      if (index >= 0) this.products.removeAt(index);
    }

    this.updateTotalQuantity();
  }

  updateTotalQuantity(): void {
    const total = this.products.controls.reduce((sum, ctrl) => {
      return sum + Number(ctrl.get('transactionQuantity')?.value || 0);
    }, 0);

    this.transactionForm.patchValue({ quantity: total });
  }

  submit(): void {
    if (this.transactionForm.invalid || this.products.length === 0) {
      this.errorMessage = 'Please fill all fields and select at least one product.';
      return;
    }

    const payload: InventoryTransaction = this.transactionForm.getRawValue();
    this.inventoryService.createTransaction(payload).subscribe({
      next: () => {
        this.successMessage = 'Transaction created successfully!';
        this.errorMessage = '';
        this.transactionForm.reset();
        this.products.clear();
        this.tabService.setTab('view');
      },
      error: () => {
        this.errorMessage = 'Failed to create transaction.';
        this.successMessage = '';
      }
    });
  }
}
