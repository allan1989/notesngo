import { Component, OnInit } from '@angular/core';
import {
  selectNotes,
  selectSingleNoteForModal,
  addEditNoteModal,
  addEditNoteModalMode,
  getSelectedNoteId
} from '../../app/reducers/selectors/selectors';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, distinct, filter, forkJoin, last, merge, mergeAll, withLatestFrom } from 'rxjs';
import { INote } from 'src/services/note.model';
import { showAddEditNoteModal } from 'src/app/reducers/actions/actions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/services/note.service';
import { PrioritiesListLabel, PrioritiesListValue } from 'src/services/note.model';

@Component({
  selector: 'app-modal-add-edit-note',
  templateUrl: './modal-add-edit-note.component.html',
  styleUrls: ['./modal-add-edit-note.component.scss']
})
export class ModalAddEditNoteComponent implements OnInit {

  public showAddEditNoteModal$!: Observable<boolean>;
  public isAddMode$!: Observable<boolean>;

  public noteForm!: FormGroup;
  public currentNote$!: Observable<INote[]>;

  public currentNotes!: INote[];
  public currentNoteId!: number;

  public prioritiesListLabel = PrioritiesListLabel;
  public prioritiesListValue = PrioritiesListValue;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.showAddEditNoteModal$ = this.store.pipe(select(addEditNoteModal));
    this.isAddMode$ = this.store.pipe(select(addEditNoteModalMode));
    this.currentNote$ = this.store.pipe(select(selectSingleNoteForModal));

    this.store.pipe(select(selectNotes)).subscribe(
      notes => this.currentNotes = notes
    )

    this.store.pipe(select(getSelectedNoteId)).subscribe(
      id => this.currentNoteId = id
    )

    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required, this.noWhitespaceValidator]],
      body: ['', [Validators.required, this.noWhitespaceValidator]],
      priority: ['', [Validators.required]]
    });

    combineLatest([this.isAddMode$, this.currentNote$]).subscribe(
      ([isAddMode, currentNote]) => {
        //console.log(isAddMode, currentNote)
        if (isAddMode) {
          this.noteForm.reset();
          return;
        } else {
          this.noteForm.patchValue({
            body: currentNote[0]?.body,
            title: currentNote[0]?.title,
            id: currentNote[0]?.id,
            priority: currentNote[0]?.priority
          })
        }
      }
    )
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  hideModal() {
    this.store.dispatch(showAddEditNoteModal({ showAddEditNoteModal: false }));
  }

  onSubmitCreateNewNote() {
    if (this.noteForm.invalid) {
      return;
    }
    this.noteForm.value.id = Math.floor(Math.random() * Date.now())
    this.noteService.addNote(this.noteForm.value);
    this.noteForm.reset();
  }

  onSubmitUpdateNote() {
    let newNote = {
      title: this.noteForm.value.title,
      body: this.noteForm.value.body,
      priority: this.noteForm.value.priority,
      id: this.currentNoteId
    }
    this.noteService.updateNote(newNote);
    this.noteForm.reset();
  }
}