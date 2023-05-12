import { Injectable } from '@angular/core';
import {
  showRemoveNoteModal,
  hideRemoveNoteModal,
  removeNote,
  addNote,
  updateNote,
  showAddEditNoteModal,
  getNoteId,
  hideAddEditNoteToast,
  showAddEditNoteToast,
  setFormMode,
  selectedNote,
  updatedNote
} from 'src/app/reducers/actions/actions';
import { Store } from '@ngrx/store';
import { IState } from './note.model';
import { INote } from './note.model';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private store: Store<IState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  showAddEditForm() {
    this.store.dispatch(showAddEditNoteModal({ showAddEditNoteModal: true }));
    this.store.dispatch(setFormMode({ isAddMode: true }));
  }

  showRemoveNoteModal() {
    this.store.dispatch(showRemoveNoteModal({ showRemoveNoteModal: true }))
  }

  hideDeleteNoteModal() {
    this.store.dispatch(hideRemoveNoteModal({ showRemoveNoteModal: false }));
  }

  deleteNote(id: number) {
    this.store.dispatch(removeNote({ selectedNoteId: id }));
    this.hideDeleteNoteModal();
  }

  showAddEditNoteModal() {
    this.store.dispatch(showAddEditNoteModal({ showAddEditNoteModal: true }));
  }

  showAddEditModalForUpdating(note: INote) {
    this.store.dispatch(selectedNote({ selectedNote: [note] }));
    this.store.dispatch(getNoteId({ selectedNoteId: note.id }))
    this.store.dispatch(setFormMode({ isAddMode: false }));
    this.store.dispatch(showAddEditNoteModal({ showAddEditNoteModal: true }));
  }

  showAddEditModalForCreating() {
    this.store.dispatch(showAddEditNoteModal({ showAddEditNoteModal: true }))
  }

  addNote(note: INote) {
    this.store.dispatch(addNote({ note: note }));
    this.store.dispatch(showAddEditNoteModal({ showAddEditNoteModal: false }));
    this.store.dispatch(showAddEditNoteToast({ showAddEditNoteToast: true }));
    this.router.navigate([`notes/${note.priority}`], { relativeTo: this.route })
    setTimeout(
      () => {
        this.store.dispatch(hideAddEditNoteToast())
      },
      2000
    )
  }

  updateNote(note: INote) {
    this.store.dispatch(showAddEditNoteModal({ showAddEditNoteModal: false }));
    this.store.dispatch(showAddEditNoteToast({ showAddEditNoteToast: true }));
    this.store.dispatch(updatedNote({ updatedNote: [note] }));
    this.store.dispatch(updateNote());
    this.router.navigate([`notes/${note.priority}`], { relativeTo: this.route })
    setTimeout(
      () => this.store.dispatch(hideAddEditNoteToast()),
      2000
    )
  }
}