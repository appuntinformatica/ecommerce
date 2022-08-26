import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, of, Subscription } from 'rxjs';

import { AppState } from 'src/app/store/app.state';
import { Post } from '../posts.model';
import * as fromActions from '../state/posts.actions';
import * as fromSelector from '../state/posts.selector';
import * as fromReducer from '../state/posts.reducer';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit, OnDestroy {

  subsc1!: Subscription;
  subsc2!: Subscription;
  
  id!: number | null;
  editMode: boolean = false;

  postById$: Observable<Post | null>;
  postForm!: FormGroup;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.postById$ = store.select(fromSelector.selectPostById)!;
   }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });

    this.subsc1 = this.route.paramMap.subscribe(params => {
      if ( params.get('id') ) {
        this.id = +params.get('id')!;
        this.editMode = true;
        this.postForm.disable();
        this.loadPostById();
      }
    });

    this.subsc2 = this.postById$.subscribe(post => {
      if (post) {
        this.postForm.patchValue({
          title: post.title,
          content: post.content
        });
      }
    });
  }  

  ngOnDestroy(): void {
    this.subsc1.unsubscribe();
    this.subsc2.unsubscribe();
  }

  onSave() {
    const post : Post = {
      id: this.id!,
      datetime: new Date(),
      title: this.postForm.value.title,
      content: this.postForm.value.content,
    };
    if ( this.editMode ) {

    } else {
      this.store.dispatch(fromActions.AddPost({ payload: { post } }));
    }
  }

  onEdit() {
    this.editMode = true;
    this.postForm.enable();
  }

  loadPostById() {
    this.store.dispatch(fromActions.LoadPostById({ payload: { id: this.id! }}))        
  }
 
}