import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NoteService } from './note.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Initialstate } from 'src/app/reducers';
import { INote, IState } from './note.model';
import * as actions from '../app/reducers/actions/actions';
import { routes } from '../components/home/home-routing.module';

describe('NoteService', () => {
    let service: NoteService;
    let store: MockStore<IState>;
    let storeSpy: any;
    let router: Router;
    const initialState = Initialstate;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({ initialState }),
                { provide: NoteService }
            ],
            imports: [RouterTestingModule.withRoutes(routes)],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        service = TestBed.inject(NoteService);
        router = TestBed.inject(Router);
        store = TestBed.inject(MockStore);
        storeSpy = spyOn(store, 'dispatch');
        router.initialNavigation();
    });

    it('creates the service', () => {
        expect(service).toBeTruthy();
    });

    it('dispatches 2 actions when calling showAddEditForm', () => {
        const expectedAction1 = actions.showAddEditNoteModal({ showAddEditNoteModal: true });
        const expectedAction2 = actions.setFormMode({ isAddMode: true })
        service.showAddEditForm();
        expect(storeSpy).toHaveBeenCalledWith(expectedAction1);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction2);
    });

    it('dispatches 1 action when calling showDeleteNoteModal', () => {
        const expectedAction = actions.showRemoveNoteModal({ showRemoveNoteModal: true });
        service.showRemoveNoteModal();
        expect(storeSpy).toHaveBeenCalledWith(expectedAction);
    });

    it('dispatches 1 action when calling hideDeleteNoteModal', () => {
        const expectedAction = actions.hideRemoveNoteModal({ showRemoveNoteModal: false });
        service.hideDeleteNoteModal();
        expect(storeSpy).toHaveBeenCalledWith(expectedAction);
    });

    it('dispatches the correct action and call service method hideDeleteNoteModal()', () => {
        const expectedAction = actions.removeNote({ selectedNoteId: 2 });
        const spy = spyOn(service, 'hideDeleteNoteModal');
        service.deleteNote(2);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction);
        expect(spy).toHaveBeenCalled();
    });

    it('dispatches the correct action when calling showAddEditNoteModal', () => {
        const expectedAction = actions.showAddEditNoteModal({ showAddEditNoteModal: true });
        service.showAddEditNoteModal();
        expect(storeSpy).toHaveBeenCalledWith(expectedAction);
    });

    it('dispatches the correct 4 actions when calling showAddEditModalForUpdating()', () => {
        const note: INote = { id: 2, priority: 'haute', body: 'lorem ispsum', title: 'toto' };
        const expectedAction1 = actions.selectedNote({ selectedNote: [note] });
        const expectedAction2 = actions.getNoteId({ selectedNoteId: note.id });
        const expectedAction3 = actions.setFormMode({ isAddMode: false });
        const expectedAction4 = actions.showAddEditNoteModal({ showAddEditNoteModal: true });
        service.showAddEditModalForUpdating(note);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction1);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction2);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction3);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction4);
    });

    it('dispatches the correct action when calling showAddEditModalForCreating()', () => {
        const expectedAction = actions.showAddEditNoteModal({ showAddEditNoteModal: true });
        service.showAddEditModalForCreating();
        expect(storeSpy).toHaveBeenCalledWith(expectedAction);
    });

    it('dispatches the correct 5 actions and redirect page with the priority of the note when calling addNote', (fakeAsync(() => {
        const note: INote = { id: 2, priority: 'moyenne', body: 'lorem ispsum', title: 'toto' };
        const expectedAction1 = actions.addNote({ note: note })
        const expectedAction2 = actions.showAddEditNoteModal({ showAddEditNoteModal: false });
        const expectedAction3 = actions.showAddEditNoteToast({ showAddEditNoteToast: true });
        const expectedAction4 = actions.hideAddEditNoteToast();
        service.addNote(note);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction1);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction2);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction3);
        tick();
        expect(router.url.split('/')[2]).toBe(note.priority);
        tick(2000);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction4);
    })));

    it('dispatches the correct 5 actions and redirect page with the priority of the note when calling updateNote', (fakeAsync(() => {
        const note: INote = { id: 2, priority: 'basse', body: 'lorem ispsum', title: 'toto' };
        const expectedAction1 = actions.showAddEditNoteModal({ showAddEditNoteModal: false });
        const expectedAction2 = actions.showAddEditNoteToast({ showAddEditNoteToast: true });
        const expectedAction3 = actions.updatedNote({ updatedNote: [note] });
        const expectedAction4 = actions.updateNote();
        const expectedAction5 = actions.hideAddEditNoteToast();
        service.updateNote(note);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction1);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction2);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction3);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction4);
        tick();
        expect(router.url.split('/')[2]).toBe(note.priority);
        tick(2000);
        expect(storeSpy).toHaveBeenCalledWith(expectedAction5)
        flush();
    })))
});
