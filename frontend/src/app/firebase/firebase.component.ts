import { DataStorageService } from './data-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../posts/posts.model';
import { pipe, map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent implements OnInit, OnDestroy {

  postForm!: FormGroup;
  id!: number | null;
  editMode: boolean = false;

  constructor(private service: DataStorageService,) { }

  ngOnInit(): void {

    const now = new Date();
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
  }

  ngOnDestroy(): void {
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
      // this.store.dispatch(fromActions.UpdatePost({ payload: { post } }));
    } else {
        this.service.save(post).subscribe(data => {
          console.log(data);
        });     
    }
  }

  onRemove() {
    /*
    const modalRef = this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.content = 'Are you sure?';
    modalRef.result
      .then(res => {
        this.store.dispatch(fromActions.RemovePost({ payload: { id: this.id! } }));
      })
      .catch(res => { });
      */
  }

  onEdit() {
    this.editMode = true;
    this.postForm.enable();
  }

  loadPostById() {
    //this.store.dispatch(fromActions.LoadPostById({ payload: { id: this.id! }}))        
  }

}
