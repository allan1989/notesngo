// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ModalAddEditNoteComponent } from './modal-add-edit-note.component';
// import { NoteService } from 'src/services/note.service';
// import { MockStore, provideMockStore } from '@ngrx/store/testing';
// import { Initialstate } from 'src/app/reducers';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';
// import { RouterTestingModule } from '@angular/router/testing';
// import { showAddEditNoteModal } from 'src/app/reducers/actions/actions';

// fdescribe('ModalAddEditNoteComponent', () => {
//     let component: ModalAddEditNoteComponent;
//     let fixture: ComponentFixture<ModalAddEditNoteComponent>;
//     let store: MockStore;
//     let router: Router;
//     let service: NoteService;
//     const initialState = Initialstate;

//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             declarations: [ModalAddEditNoteComponent],
//             providers: [
//                 { provide: NoteService },
//                 provideMockStore({
//                     initialState
//                 }),

//             ],
//             imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//         service = TestBed.inject(NoteService)
//         store = TestBed.inject(MockStore)
//         router = TestBed.inject(Router);
//     });

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ModalAddEditNoteComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     xit('create component', () => {
//         component.showAddEditNoteModal$ = of(true);
//         fixture.detectChanges()
//         expect(component).toBeTruthy();
//     });

//     it('creates NoteService', () => {

//         expect(service).toBeTruthy();
//     });
// });
