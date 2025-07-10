import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FogotpasswordComponent } from './components/fogotpassword/fogotpassword.component';
import { AdmindashboardComponent } from './AdminDashboard/admindashboard/admindashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProcurementdashboardComponent } from './ProcurementDashboard/procurementdashboard/procurementdashboard.component';
import { CreateOrderComponent } from './ProcurementDashboard/create-order/create-order.component';
import { ViewOrderComponent } from './ProcurementDashboard/view-order/view-order.component';
import { TrackOrderComponent } from './ProcurementDashboard/track-order/track-order.component';
import { InventorydashboardComponent } from './InventoryManagerDashboard/inventorydashboard/inventorydashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  { path: 'forgot-password', component: FogotpasswordComponent },
  { path: 'admin-dashboard', component: AdmindashboardComponent, canActivate: [AuthGuard] },
   { path: 'procurement-dashboard', component: ProcurementdashboardComponent, canActivate: [AuthGuard] },
   { path: 'inventory-dashboard', component: InventorydashboardComponent, canActivate: [AuthGuard] },
   { path: 'create-order', component: CreateOrderComponent, canActivate: [AuthGuard] },
   { path: 'view-order', component: ViewOrderComponent, canActivate: [AuthGuard] },
   { path: 'track-order/:id', component: TrackOrderComponent , canActivate: [AuthGuard] },

  {
    path: '**',
    redirectTo: ''  // fallback to login if route not found
  }
];

// export const appRouter = provideRouter(routes);