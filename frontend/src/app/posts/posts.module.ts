import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';

import { PostsEffects } from './state/posts.effects';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [ 
  {
    path: '',
    children: [
      { path: 'post-list', component: PostListComponent },
      { path: 'post-edit', component: PostEditComponent },
      { path: 'post-edit/:id', component: PostEditComponent  },
      { path: '', redirectTo: 'post-list', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [
    PostListComponent,
    PostEditComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([PostsEffects]),
    RouterModule.forChild(routes)
  ]
})
export class PostsModule { }
