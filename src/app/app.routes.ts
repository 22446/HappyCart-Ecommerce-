import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { logDoneGuard } from './Core/gurads/log-done.guard';
import { authGuard } from './Core/gurads/auth.guard';
import { HomeComponent } from './Component/home/home.component';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, canActivate: [logDoneGuard], children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./Component/login/login.component').then(m => m.LoginComponent), title: 'Login' },
            { path: 'register', loadComponent: () => import('./Component/register/register.component').then(m => m.RegisterComponent), title: 'Sign Up' },
            { path: 'forget', loadComponent: () => import('./Component/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent), title: 'Forget Password' }
        ]
    },
    {
        path: '', component: BlankLayoutComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component:HomeComponent, title: 'Home' },
            { path: 'brands', loadComponent: () => import('./Component/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
            { path: 'cart', loadComponent: () => import('./Component/cart/cart.component').then(m => m.CartComponent), title: 'Cart' },
            { path: 'categories', loadComponent: () => import('./Component/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },
            { path: 'products', loadComponent: () => import('./Component/products/products.component').then(m => m.ProductsComponent), title: 'Products' },
            { path: 'details/:id', loadComponent: () => import('./Component/details/details.component').then(m => m.DetailsComponent), title: 'Details' },
            { path: 'Categoriedetails/:id', loadComponent: () => import('./Component/categorie-detailes/categorie-detailes.component').then(m => m.CategorieDetailesComponent), title: 'Category Details' },
            { path: 'BrandDetails/:id', loadComponent: () => import('./Component/brands-detailes/brands-detailes.component').then(m => m.BrandsDetailesComponent), title: 'Brand Details' },
            { path: 'orderdetails/:id', loadComponent: () => import('./Component/order-details/order-details.component').then(m => m.OrderDetailsComponent), title: 'Order Details' },
            { path: 'allorders', loadComponent: () => import('./Component/allorders/allorders.component').then(m => m.AllordersComponent), title: 'All Orders' },
            { path: 'WishList', loadComponent: () => import('./Component/wishlist/wishlist.component').then(m => m.WishlistComponent), title: 'Wishlist' }
        ]
    }
];
