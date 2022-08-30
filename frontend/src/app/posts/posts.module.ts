import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EffectsModule } from '@ngrx/effects';

import { PostsEffects } from './state/posts.effects';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { NgbdSortableHeader } from '../shared/ngbd-sortable-header/ngbd-sortable-header.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule, eyeFill, search, calendar } from 'ngx-bootstrap-icons';

const routes: Routes = [ 
  {
    path: '',
    children: [
      { path: 'post-list', component: PostListComponent },
      { path: 'post-list/:query', component: PostListComponent },
      { path: 'post-edit', component: PostEditComponent },
      { path: 'post-edit/:id', component: PostEditComponent  },
      { path: '', redirectTo: 'post-list', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [
    NgbdSortableHeader,
    PostListComponent,
    PostEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxBootstrapIconsModule.pick({ eyeFill, search, calendar }),
    EffectsModule.forFeature([PostsEffects]),
    RouterModule.forChild(routes)
  ]
})
export class PostsModule { }
