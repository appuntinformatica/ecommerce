import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';

import { HomeComponent } from './home/home.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FirebaseComponent } from './firebase/firebase.component';

const routes: Routes = [
  {
    path: 'firebase',
    component: FirebaseComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'upload',
    component: FileUploadComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
