import {
  createReducer,
  on
} from '@ngrx/store';
import * as actions from '../reducers/actions/actions';
import { IState, INote } from 'src/services/note.model';

export const Initialstate: IState = {
  showRemoveNoteModal: false,
  selectedNoteId: 0,
  showAddEditNoteModal: false,
  isAddMode: true,
  showAddEditNoteToast: false,
  data: [],
  selectedNote: [],
  updatedNote: []
}

export const notesReducer = createReducer(
  Initialstate,
  on(actions.showRemoveNoteModal, (state, { showRemoveNoteModal }) => ({
    ...state, showRemoveNoteModal
  })),
  on(actions.hideRemoveNoteModal, (state, { showRemoveNoteModal }) => ({ ...state, showRemoveNoteModal })),
  on(actions.removeNote, (state, { selectedNoteId }) => ({
    ...state, data: [...state.data.filter(note => note.id !== selectedNoteId)]
  })),
  on(actions.showAddEditNoteModal, (state, { showAddEditNoteModal }) => ({
    ...state, showAddEditNoteModal
  })),
  on(actions.setFormMode, (state, { isAddMode }) => ({
    ...state, isAddMode
  })),
  on(actions.addNote, (state, { note }) => ({
    ...state, data: [...state.data].concat(note)
  })),
  on(actions.updateNote, (state) => ({
    ...state, data: [
      ...state.data.map(
        (note) => {
          if (note['id'] === state.updatedNote[0].id) {
            return {
              title: state.updatedNote[0].title,
              body: state.updatedNote[0].body,
              priority: state.updatedNote[0].priority,
              id: note['id']
            }
          }
          else {
            return note
          }
        }
      )
    ]
  })),
  on(actions.getNoteId, (state, { selectedNoteId }) => ({
    ...state, selectedNoteId
  })),
  on(actions.showAddEditNoteToast, (state, { showAddEditNoteToast }) => ({
    ...state, showAddEditNoteToast
  })),
  on(actions.hideAddEditNoteToast, (state) => ({
    ...state, showAddEditNoteToast: false
  })),
  on(actions.selectedNote, (state, { selectedNote }) => ({
    ...state, selectedNote
  })),
  on(actions.updatedNote, (state, { updatedNote }) => ({
    ...state, updatedNote
  })),
)