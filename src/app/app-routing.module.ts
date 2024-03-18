import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoreinfoComponent } from './moreinfo/moreinfo.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'recipes', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path : 'home', component : HomeComponent},
  { path : 'menu', component : MenuComponent},
  { path : 'moreinfo', component : MoreinfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
