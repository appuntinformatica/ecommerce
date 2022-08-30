import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { Observable, of, Subscription } from 'rxjs';
import { NgbdModalConfirm } from 'src/app/shared/modal-confirm/ngbd-modal-confirm.component';

import { AppState } from 'src/app/store/app.state';
import { Post } from '../posts.model';
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
  
  id!: number | null;
  editMode: boolean = false;

  postById$: Observable<Post | null>;
  postForm!: FormGroup;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private modalService: NgbModal) {
    this.postById$ = store.select(fromSelector.selectPostById)!;
   }

  ngOnInit(): void {
    const now = new Date();
    console.log(now.toLocaleDateString());

    this.postForm = new FormGroup({
      date: new FormControl({
        year: now.getFullYear(), 
        month: now.getMonth() + 1,
        day: now.getDate()
      }, [Validators.required]),
      time: new FormControl({
        hour: now.getHours(),
        minute: now.getMinutes()
      }, [Validators.required]),
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
        const datetime = new Date(post.datetime);
        this.postForm.patchValue({
          date: {
            year: datetime.getFullYear(),
            month: datetime.getMonth() + 1,
            day: datetime.getDate()
          },
          time: {
            hour: datetime.getHours(),
            minute: datetime.getMinutes()
          },
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
    const date =  this.postForm.value.date
    const time =  this.postForm.value.time
    const datetime = new Date();
    datetime.setFullYear(date.year);
    datetime.setMonth(date.month - 1);
    datetime.setDate(date.day);
    datetime.setHours(time.hour);
    datetime.setMinutes(time.minute);
    datetime.setSeconds(0);
    datetime.setMilliseconds(0);
    
    const post : Post = {
      id: this.id!,
      datetime: datetime,
      title: this.postForm.value.title,
      content: this.postForm.value.content
    };
    if ( this.editMode ) {
      this.store.dispatch(fromActions.UpdatePost({ payload: { post } }));
    } else {
      this.store.dispatch(fromActions.AddPost({ payload: { post } }));
    }
  }

  onRemove() {
    const modalRef = this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.content = 'Are you sure?';
    modalRef.result
      .then(res => {
        this.store.dispatch(fromActions.RemovePost({ payload: { id: this.id! } }));
      })
      .catch(res => { });
  }

  onEdit() {
    this.editMode = true;
    this.postForm.enable();
  }

  loadPostById() {
    this.store.dispatch(fromActions.LoadPostById({ payload: { id: this.id! }}))        
  }
 
}