import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.state';

import * as fromAuthActions from '../../auth/state/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed = true;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {

  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(fromAuthActions.autoLogout());    
  }
}