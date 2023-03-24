import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INote } from 'src/services/note.model';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectSingleNote } from 'src/app/reducers/selectors/selectors';

@Component({
  selector: 'app-note-full',
  templateUrl: './note-full.component.html',
  styleUrls: ['./note-full.component.scss']
})
export class NoteFullComponent implements OnInit, OnDestroy {

  private sub!: Subscription;
  public note$!: Observable<INote[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(
      params => {
        this.note$ = this.store.pipe(select(selectSingleNote(+params['id'])))
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}