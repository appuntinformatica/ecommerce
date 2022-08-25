import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, of, Subscription } from 'rxjs';

import { AppState } from 'src/app/store/app.state';
import * as fromActions from '../state/posts.actions';
import * as fromSelector from '../state/posts.selector';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit, OnDestroy {

  subsc1!: Subscription;
  subsc2!: Subscription;
  subsc3!: Subscription;
  
  id$!: Observable<number | null>;
  edited$: Observable<boolean> = of(false);
  post$ = this.store.select(fromSelector.getPost);

  postForm!: FormGroup;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.dispatch(fromActions.clearPost());
    
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });

    this.subsc1 = this.route.paramMap.subscribe(params => {
      if ( params.get('id') ) {
        this.id$ = of(+params.get('id')!);
        this.edited$ = of(true);
        this.loadPost();
      }
    });
    this.subsc2 = this.post$.subscribe(p => {
      this.postForm.patchValue({
        //title: p?.title,
        //content: p?.content
      });
    });
  }

  ngOnDestroy(): void {
    this.subsc1?.unsubscribe();
    this.subsc2?.unsubscribe();
    this.subsc3?.unsubscribe();
  }

  loadPost() {
    console.log('PostEditComponent.loadPost()');
    this.subsc3 = this.id$?.subscribe(id => {
      if (id) {
        this.store.dispatch(fromActions.getPost({ id: id }));
      }
    });    
  }

}
