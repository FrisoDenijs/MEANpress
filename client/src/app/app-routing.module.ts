import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public/public.component';
import { AdminComponent } from './admin/admin/admin.component';

const routes: Routes = [
  {path: '', component: PublicComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
