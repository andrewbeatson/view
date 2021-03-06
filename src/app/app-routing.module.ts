import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { SetupAuthGuard } from './setupGuard/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin-dashboard',
        pathMatch: 'full',
      },

      {
        path: 'admin-dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'basic',
        loadChildren: () =>
          import('./components/basic/basic.module').then((m) => m.BasicModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import(
            './components/advance/notifications/notifications.module'
          ).then((m) => m.NotificationsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'forms',
        loadChildren: () =>
          import(
            './components/forms/basic-elements/basic-elements.module'
          ).then((m) => m.BasicElementsModule),
      },
      {
        path: 'bootstrap-table',
        loadChildren: () =>
          import(
            './components/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module'
          ).then((m) => m.BasicBootstrapModule),
      },
      {
        path: 'map',
        loadChildren: () =>
          import('./map/google-map/google-map.module').then(
            (m) => m.GoogleMapModule
          ),
      },
      {
        path: 'simple-page',
        loadChildren: () =>
          import('./simple-page/simple-page.module').then(
            (m) => m.SimplePageModule
          ),
      },
      {
        path: 'admin-restaurants',
        loadChildren: () =>
          import('./restaurants/restaurants.module').then(
            (m) => m.RestaurantsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-notification',
        loadChildren: () =>
          import('./notification/notification.module').then(
            (m) => m.NotificationModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-rest-details',
        loadChildren: () =>
          import('./restdetails/restdetails.module').then(
            (m) => m.RestdetailsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-support',
        loadChildren: () =>
          import('./supports/supports.module').then((m) => m.SupportsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-chats',
        loadChildren: () =>
          import('./chats/chats.module').then((m) => m.ChatsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-newuser',
        loadChildren: () =>
          import('./newuser/newuser.module').then((m) => m.NewuserModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-locations',
        loadChildren: () =>
          import('./locations/locations.module').then((m) => m.LocationsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-newlocations',
        loadChildren: () =>
          import('./newlocations/newlocations.module').then(
            (m) => m.NewlocationsModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [SetupAuthGuard],
      },
      {
        path: 'setup',
        loadChildren: () =>
          import('./setup/setup.module').then((m) => m.SetupModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
