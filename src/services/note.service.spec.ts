import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NoteService } from './note.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Initialstate } from 'src/app/reducers';
import { IState } from './note.model';

// describe('NoteService', () => {
//   let service: NoteService;
//   let store: MockStore<IState>;
//   let storeSpy: any;
//   let router: Router;
//   const initialState = Initialstate;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         provideMockStore({ initialState }),
//         { provide: NoteService }
//       ],
//       imports: [RouterTestingModule.withRoutes([])],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     });
//     service = TestBed.inject(NoteService);
//     router = TestBed.inject(Router);
//     store = TestBed.inject(MockStore);
//     storeSpy = spyOn(store, 'dispatch');
//   });

//   xit('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   xit('dispatches 2 actions when calling showAddEditForm', () => {
//     const expectedAction1 = { showAddEditNoteModal: true, type: '[ NOTES ] ADD/EDIT NOTE MODAL' };
//     const expectedAction2 = { isAddMode: true, type: '[ NOTES ] SET MODAL MODE' };
//     service.showAddEditForm();
//     expect(storeSpy).toHaveBeenCalledWith(expectedAction1);
//     expect(storeSpy).toHaveBeenCalledWith(expectedAction2);
//   });

//   xit('dispatches 1 action when calling showDeleteNoteModal', () => {
//     const expectedAction = { showRemoveNoteModal: true, type: '[ NOTES ] SHOW REMOVE NOTE MODAL' };
//     service.showRemoveNoteModal();
//     expect(storeSpy).toHaveBeenCalledWith(expectedAction);
//   });
// });
