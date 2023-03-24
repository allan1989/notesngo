import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { showAddEditNoteToast, AddEditNoteModalMode } from 'src/app/reducers/selectors/selectors';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  public isToastVisible$!: Observable<boolean>;
  public isAddMode$!: Observable<boolean>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.isToastVisible$ = this.store.pipe(select(showAddEditNoteToast));
    this.isAddMode$ = this.store.pipe(select(AddEditNoteModalMode));
  }
}
