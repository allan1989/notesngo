import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/services/note.service';
import { INote } from 'src/services/note.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectSingleNoteForModal, removeNoteModal } from 'src/app/reducers/selectors/selectors';

@Component({
  selector: 'app-modal-remove-note',
  templateUrl: './modal-remove-note.component.html',
  styleUrls: ['./modal-remove-note.component.scss']
})
export class ModalRemoveNoteComponent implements OnInit {
  public selectedNote$!: Observable<INote[]>;
  public showRemoveNoteModal$!: Observable<boolean>;

  constructor(private noteService: NoteService, private store: Store) { }

  ngOnInit(): void {
    this.selectedNote$ = this.store.pipe(select(selectSingleNoteForModal));
    this.showRemoveNoteModal$ = this.store.pipe(select(removeNoteModal))
  }

  hideDeleteNoteModal() {
    this.noteService.hideDeleteNoteModal();
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
  }
}