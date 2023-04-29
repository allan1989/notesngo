import { createSelector, createFeatureSelector } from "@ngrx/store";
import { INote, IState } from "src/services/note.model";

// constant to get 'notes' level state object
export const featureKey = 'notes';

// access to get level state key 'notes' from global state
export const selectNotesFeature = createFeatureSelector<IState>(featureKey);

// get all notes from state
// return an array of objects (INote)
export const selectNotes = createSelector(
  selectNotesFeature,
  (state: IState) => state.data
);

// show or hide remove note modal
// return an boolean
export const removeNoteModal = createSelector(
  selectNotesFeature,
  (state: IState) => state.showRemoveNoteModal
);

// return the id of the note selected
export const selectedNoteId = createSelector(
  selectNotesFeature,
  (state: IState) => state.selectedNoteId
)

// filter notes by priority
export const selectNotesByPriority = (priority: string) =>
  createSelector(
    selectNotes,
    (notes) => notes.filter(note => note.priority === priority)
  )

// filter note by id
// id comes from route parameters
export const selectSingleNote = (id: number) =>
  createSelector(
    selectNotes,
    (notes) => notes.filter(note => note.id === id)
  )

// filter note by id
// id comes from global state
export const selectSingleNoteForModal = createSelector(
  selectNotes,
  selectedNoteId,
  (notes: INote[], selectedNoteId: number) => {
    if (notes && selectedNoteId) {
      return notes.filter((note: INote) => note.id === selectedNoteId)
    } else {
      return []
    }
  }
)

// show or hide add/edit note modal
// return a boolean
export const addEditNoteModal = createSelector(
  selectNotesFeature,
  (notes) => notes.showAddEditNoteModal
)

// When calling the modal AddEditNote
// get the mode (Add or Edit)
export const addEditNoteModalMode = createSelector(
  selectNotesFeature,
  (notes) => notes.isAddMode
)

// show or hide toast notification
// return a boolean
export const showAddEditNoteToast = createSelector(
  selectNotesFeature,
  (notes) => notes?.showAddEditNoteToast
)

// get id when editing a note
export const getSelectedNoteId = createSelector(
  selectNotesFeature,
  (notes) => notes.selectedNoteId
)

// This way the property won't be read until it is available if indeed, it ever comes available.