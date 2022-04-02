import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
