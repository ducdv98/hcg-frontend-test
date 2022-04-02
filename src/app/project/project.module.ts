import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, pages, PokemonsComponent } from './pages';
import { components } from './components';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { BypassDomSanitizerModule } from '@app/core/pipes/bypass-dom-sanitizer/bypass-dom-sanitizer.module';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'pokemons',
        component: PokemonsComponent
      }
    ],
  }
];

@NgModule({
  declarations: [pages, components, ProjectComponent],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    CommonModule,
    IvyCarouselModule,
    BypassDomSanitizerModule,
    NzImageModule,
    NzModalModule,
    NzInputModule,
    NzPaginationModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzAlertModule,
    NzDropDownModule
  ],
})
export class ProjectModule {
}
