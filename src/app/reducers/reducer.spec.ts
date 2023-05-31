import * as fromReducer from './index';
import * as actions from './actions/actions';
import { IState } from 'src/services/note.model';

describe('NotesReducer', () => {
    let initialstate: IState;
    beforeEach(() => {
        initialstate = fromReducer.Initialstate;
    });

    it('should return the default state', () => {
        const action = { type: 'Unknown' };
        const state = fromReducer.notesReducer(initialstate, action);
        expect(state).toBe(initialstate);
    });


    it('should show RemoveNoteModal', () => {
        const action = actions.showRemoveNoteModal({
            showRemoveNoteModal: true
        });
        const state = fromReducer.notesReducer(initialstate, action);
        expect(state.showRemoveNoteModal).toBe(true);

    });

    it('should hide RemoveNoteModal', () => {
        const action = actions.showRemoveNoteModal({
            showRemoveNoteModal: false
        });
        const state = fromReducer.notesReducer(initialstate, action);
        expect(state.showRemoveNoteModal).toBe(false);
    });

    it('should remove note', () => {
        const newState: IState = {
            showRemoveNoteModal: false,
            selectedNoteId: 0,
            showAddEditNoteModal: false,
            isAddMode: true,
            showAddEditNoteToast: false,
            updatedNote: [],
            selectedNote: [],
            data: [
                {
                    id: 0,
                    title: 'titre 0',
                    priority: 'haute',
                    body: 'lorem ipsum dolor'
                },
                {
                    id: 1,
                    title: 'titre 1',
                    priority: 'haute',
                    body: 'lorem ipsum dolor'
                },
                {
                    id: 2,
                    title: 'titre 2',
                    priority: 'haute',
                    body: 'lorem ipsum dolor'
                }
            ]
        }
        const action = actions.removeNote({
            selectedNoteId: 1
        });
        const noteToDelete = {
            id: 1,
            title: 'titre 1',
            priority: 'haute',
            body: 'lorem ipsum dolor'
        };
        const state = fromReducer.notesReducer(newState, action);
        expect(state.data).not.toContain(noteToDelete);
        expect(state.data.length).toEqual(2);
    });

    it('should show showAddEditNoteModal', () => {
        const action = actions.showAddEditNoteModal({
            showAddEditNoteModal: true
        });
        const state = fromReducer.notesReducer(initialstate, action);
        expect(state.showAddEditNoteModal).toBe(true);
    });

    it('should change form mode to editing', () => {
        const action = actions.setFormMode({
            isAddMode: false
        });
        const state = fromReducer.notesReducer(initialstate, action);
        expect(state.isAddMode).toBe(false);
    });

    it('should add note', () => {
        const newState: IState = {
            showRemoveNoteModal: false,
            selectedNoteId: 0,
            showAddEditNoteModal: false,
            isAddMode: true,
            showAddEditNoteToast: false,
            updatedNote: [],
            selectedNote: [],
            data: [
                {
                    id: 0,
                    title: 'titre 0',
                    priority: 'haute',
                    body: 'lorem ipsum dolor'
                },
                {
                    id: 1,
                    title: 'titre 1',
                    priority: 'haute',
                    body: 'lorem ipsum dolor'
                }
            ]
        }
        const action = actions.addNote({
            note: {
                id: 2,
                title: 'titre 2',
                priority: 'haute',
                body: 'lorem ipsum dolor'
            }
        });

        const noteToAdd = {
            id: 2,
            title: 'titre 2',
            priority: 'haute',
            body: 'lorem ipsum dolor'
        }

        const state = fromReducer.notesReducer(newState, action);
        expect(state.data).toContain(noteToAdd);
        expect(state.data.length).toEqual(3);
    });

    it('should update note', () => {
        const currentState: IState = {
            showRemoveNoteModal: false,
            selectedNoteId: 0,
            showAddEditNoteModal: false,
            isAddMode: true,
            showAddEditNoteToast: false,
            updatedNote: [{
                id: 1,
                title: 'titre 1',
                priority: 'moyenne',
                body: 'lorem ipsum dolor'
            }],
            selectedNote: [],
            data: [
                {
                    id: 0,
                    title: 'titre 0',
                    priority: 'haute',
                    body: 'lorem ipsum dolor'
                },
                {
                    id: 1,
                    title: 'titre 1',
                    priority: 'haute',
                    body: 'lorem ipsum dolor'
                }
            ]
        };
        const editedNote = {
            id: 1,
            title: 'titre 1',
            priority: 'moyenne',
            body: 'lorem ipsum dolor'
        }
        const action = actions.updateNote();
        const state = fromReducer.notesReducer(currentState, action);
        expect(state.data.length).toEqual(2);
        expect(state.data).toContain(editedNote);
    })
});