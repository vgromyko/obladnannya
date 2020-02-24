import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DevicesComponent } from './devices/devices.component';
import { CardsComponent } from './cards/cards.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
 
const routes: Routes = [
  {path: '', redirectTo: '/cards', pathMatch:'full' },
  {path: 'cards', component: CardsComponent },
  {path: 'devises', component: DevicesComponent },
  {path: 'users', component: UsersComponent },
  {path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
