import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


export const routes: Routes = [
  { path: 'view', component: ViewComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '', pathMatch: 'full', redirectTo: 'view' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
