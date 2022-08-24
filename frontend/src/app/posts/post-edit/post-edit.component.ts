import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  id$: Observable<number> = of(0);
  edited$: Observable<boolean> = of(false);

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if ( params.get('id') ) {
        this.id$ = of(+params.get('id')!);
        this.edited$ = of(true);
      }
    });
  }

}
