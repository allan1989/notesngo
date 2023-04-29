import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ModalAddEditNoteComponent } from './modal-add-edit-note.component';
import { NoteService } from 'src/services/note.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Initialstate } from 'src/app/reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import * as selectors from '../../app/reducers/selectors/selectors';
import * as fromReducer from '../../app/reducers/index';
import * as actions from '../../app/reducers/actions/actions';
import { INote, IState } from 'src/services/note.model';
import { PrioritiesListLabel, PrioritiesListValue } from 'src/services/note.model';
import { By } from '@angular/platform-browser';

describe('ModalAddEditNoteComponent', () => {
    let component: ModalAddEditNoteComponent;
    let fixture: ComponentFixture<ModalAddEditNoteComponent>;
    let store: MockStore<IState>;
    let router: Router;
    let service: NoteService;
    let mockselectNotesSelector;
    const initialState = Initialstate;


    beforeEach(async () => {

        await TestBed.configureTestingModule({
            declarations: [ModalAddEditNoteComponent],
            providers: [
                { provide: NoteService },
                provideMockStore({
                    initialState,
                    selectors: [
                        {
                            selector: selectors.selectNotes,
                            value: [{ id: 1, title: 't', priority: 'haute', body: 'lorem' }, { id: 2, title: 't', priority: 'haute', body: 'lorem' }]
                        },
                        {
                            selector: selectors.addEditNoteModalMode,
                            value: true
                        },
                        {
                            selector: selectors.getSelectedNoteId,
                            value: 2
                        },
                        {
                            selector: selectors.addEditNoteModal,
                            value: false
                        },
                        {
                            selector: selectors.selectSingleNoteForModal,
                            value: [{ id: 23, title: 't', priority: 'haute', body: 'lorem' }]
                        },
                        {
                            selector: selectors.addEditNoteModal,
                            value: false
                        }

                    ]
                }),


            ],
            imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        service = TestBed.inject(NoteService);
        router = TestBed.inject(Router);
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalAddEditNoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.ngOnInit();
        component.showAddEditNoteModal$ = of(true);
        fixture.detectChanges();
    });

    afterEach(() => {
        store?.resetSelectors();
        component.noteForm.controls['title'].reset();
    });

    it('creates component', () => {
        expect(component).toBeTruthy();
    });

    it('creates NoteService', () => {
        expect(service).toBeTruthy();
    });

    it('returns all the notes initially - onNgInit', () => {
        expect(component.currentNotes).toBeDefined();
        expect(component.currentNotes.length).toBe(2);
    });

    // it('hides the add/edit note modal initially - onNgInit', () => {
    //     expect(component.showAddEditNoteModal$).toBeDefined();
    //     component.showAddEditNoteModal$.subscribe(value => expect(value).toBe(false));
    // });

    it('gets the current note initially - onNgInit', () => {
        expect(component.currentNote$).toBeDefined();
        component.currentNote$.subscribe((note) => expect(note[0].id).toBe(23))
    });

    it('gets the id of the current note initially - onNgInit', () => {
        expect(component.currentNoteId).toBeDefined();
        expect(component.currentNoteId).toBe(2);
    });

    it('sets the property prioritiesListLabel initially - onNginit', () => {
        expect(component.prioritiesListLabel).toBeDefined();
        expect(component.prioritiesListLabel).toEqual(PrioritiesListLabel);
    });

    it('sets the property prioritiesListValue initially - onNginit', () => {
        expect(component.prioritiesListValue).toBeDefined();
        expect(component.prioritiesListValue).toEqual(PrioritiesListValue);
    });

    /* Form */

    it('sets the addMode to add initially and show correct add button - onNgInit', () => {
        fixture.detectChanges();
        const addBtn = fixture.debugElement.query(By.css('#btn-add'));
        expect(component.isAddMode$).toBeDefined();
        component.isAddMode$.subscribe(value => expect(value).toBe(true))
        expect(addBtn).toBeTruthy();
    });

    it('shows the correct button when form mode is update', () => {
        component.isAddMode$ = of(false);
        fixture.detectChanges();
        const updateBtn = fixture.debugElement.query(By.css('#btn-update'));
        expect(updateBtn).toBeTruthy();
    });

    it('disables the submit button when form is invalid', () => {
        const addBtn = fixture.debugElement.query(By.css('#btn-add'));
        component.noteForm.controls['title'].setValue('');
        expect(addBtn.nativeElement.getAttribute('disabled')).toBeDefined();
    })

    it('enables the submit button when form is valid', (async () => {
        const addBtn = fixture.debugElement.query(By.css('#btn-add'));
        component.noteForm.controls['title'].setValue('toto');
        component.noteForm.controls['body'].setValue('lorem');
        component.noteForm.controls['priority'].setValue('haute');
        fixture.detectChanges();
        expect(addBtn.nativeElement.getAttribute('disabled')).toBeFalsy();
    }));

    it('shows the cancel button regardless of form mode', () => {
        component.isAddMode$ = of(false);
        fixture.detectChanges();
        const cancelBtn = fixture.debugElement.query(By.css('#btn-cancel'));
        expect(cancelBtn).toBeTruthy();
    });

    it('invalidates the field title and show corresponding error message on ngInit', () => {
        const titleFieldControl = component.noteForm.controls['title'];
        const titleFieldElement = fixture.debugElement.query(By.css('#title')).nativeElement;
        const titleErrorMessage = fixture.debugElement.query(By.css('#title-error-message'));
        expect(titleFieldControl.valid).toBeFalsy();
        if (titleFieldControl.errors) {
            expect(titleFieldControl.errors['required']).toBeTruthy();
            expect(titleFieldControl.errors['whitespace']).toBeTruthy();
        }
        expect(titleFieldElement.classList).toContain('is-invalid')
        expect(titleFieldElement.classList).toContain('ng-invalid')
        expect(titleErrorMessage).toBeTruthy();
    });

    it('validates the field title with correct values', () => {
        const titleFieldControl = component.noteForm.controls['title'];
        const titleFieldElement = fixture.debugElement.query(By.css('#title')).nativeElement;

        titleFieldControl.setValue('toto');
        fixture.detectChanges();

        expect(titleFieldControl.valid).toBeTruthy();
        expect(titleFieldElement.classList).not.toContain('is-invalid');
        expect(titleFieldElement.classList).not.toContain('ng-invalid');

        const titleErrorMessage = fixture.debugElement.query(By.css('#title-error-message'));
        expect(titleErrorMessage).toBeFalsy();
    });

    it('invalidates the field body and show corresponding error message on ngInit', () => {
        const bodyFieldControl = component.noteForm.controls['title'];
        const bodyFieldElement = fixture.debugElement.query(By.css('#body')).nativeElement;
        const bodyErrorMessage = fixture.debugElement.query(By.css('#body-error-message'));
        expect(bodyFieldControl.valid).toBeFalsy();
        if (bodyFieldControl.errors) {
            expect(bodyFieldControl.errors['required']).toBeTruthy();
            expect(bodyFieldControl.errors['whitespace']).toBeTruthy();
        }
        expect(bodyFieldElement.classList).toContain('is-invalid')
        expect(bodyFieldElement.classList).toContain('ng-invalid')
        expect(bodyErrorMessage).toBeTruthy();
    });

    it('validates the field body with correct values', () => {
        const bodyFieldControl = component.noteForm.controls['body'];
        const bodyFieldElement = fixture.debugElement.query(By.css('#body')).nativeElement;
        bodyFieldControl.setValue('toto');
        fixture.detectChanges();

        expect(bodyFieldControl.valid).toBeTruthy();
        expect(bodyFieldElement.classList).not.toContain('is-invalid');
        expect(bodyFieldElement.classList).not.toContain('ng-invalid');

        const bodyErrorMessage = fixture.debugElement.query(By.css('#body-error-message'));
        expect(bodyErrorMessage).toBeFalsy();
    });

    it('invalidates the field priority and show corresponding error message on ngInit', () => {
        const priorityFieldControl = component.noteForm.controls['priority'];
        const priorityFieldElement = fixture.debugElement.query(By.css('#priority')).nativeElement;
        const priorityErrorMessage = fixture.debugElement.query(By.css('#priority-error-message'));
        expect(priorityFieldControl.valid).toBeFalsy();
        if (priorityFieldControl.errors) {
            expect(priorityFieldControl.errors['required']).toBeTruthy();
        }
        expect(priorityFieldElement.classList).toContain('is-invalid')
        expect(priorityFieldElement.classList).toContain('ng-invalid')
        expect(priorityErrorMessage).toBeTruthy();
    });

    it('validates the field priority and show corresponding error message on ngInit', () => {
        const priorityFieldControl = component.noteForm.controls['priority'];
        const priorityFieldElement = fixture.debugElement.query(By.css('#priority')).nativeElement;

        priorityFieldControl.setValue('haute');
        fixture.detectChanges();
        expect(priorityFieldControl).toBeTruthy();
        expect(priorityFieldElement.classList).not.toContain('is-invalid')
        expect(priorityFieldElement.classList).not.toContain('ng-invalid')

        const priorityErrorMessage = fixture.debugElement.query(By.css('#priority-error-message'));
        expect(priorityErrorMessage).toBeFalsy();
    });

    it('calls the method onSubmitCreateNewNote() when create new note', () => {
        const addBtn = fixture.debugElement.query(By.css('#btn-add'));
        const componentSpy = spyOn(component, 'onSubmitCreateNewNote');
        component.isAddMode$ = of(true);
        component.noteForm.controls['title'].setValue('toto');
        component.noteForm.controls['body'].setValue('lorem');
        component.noteForm.controls['priority'].setValue('haute');
        fixture.detectChanges();
        addBtn.triggerEventHandler('click');
        expect(componentSpy).toHaveBeenCalled();
    });

    it('does not call the method onSubmitCreateNewNote() if form is invalid', () => {
        const serviceSpy = spyOn(service, 'addNote');
        const formSpy = spyOn(component.noteForm, 'reset');
        component.isAddMode$ = of(true);
        component.noteForm.controls['title'].setValue('');
        component.noteForm.controls['body'].setValue('');
        component.noteForm.controls['priority'].setValue('');
        fixture.detectChanges();
        component.onSubmitCreateNewNote();
        expect(serviceSpy).not.toHaveBeenCalled();
        expect(formSpy).not.toHaveBeenCalled();
    });

    it('calls the method onSubmitCreateNewNote() with the correct value', () => {
        const serviceSpy = spyOn(service, 'addNote');
        const formSpy = spyOn(component.noteForm, 'reset');
        component.isAddMode$ = of(true);
        const newNote = { title: 'toto', body: 'toto', priority: 'haute' };
        const result = { title: 'toto', body: 'toto', priority: 'haute', id: 1 }
        component.noteForm.setValue(newNote);
        fixture.detectChanges();
        component.onSubmitCreateNewNote();
        component.noteForm.value.id = 1;
        expect(serviceSpy).toHaveBeenCalledWith(result);
        expect(formSpy).toHaveBeenCalled();

    });

    it('calls the method onSubmitUpdateNote() with the correct value', () => {
        const serviceSpy = spyOn(service, 'updateNote');
        const formSpy = spyOn(component.noteForm, 'reset');
        component.isAddMode$ = of(true);
        component.currentNoteId = 3;

        const newNote = { title: 'toto', body: 'toto', priority: 'haute' };
        component.noteForm.value.id = 1;
        const result = { title: 'toto', body: 'toto', priority: 'haute', id: component.currentNoteId }
        component.noteForm.setValue(newNote);
        fixture.detectChanges();

        component.onSubmitUpdateNote();
        expect(serviceSpy).toHaveBeenCalledWith(result);
        expect(formSpy).toHaveBeenCalled();
    });

    it('call the method hideModal() when click', () => {
        const btn = fixture.debugElement.query(By.css('#btn-cancel'));
        const spy = spyOn(component, 'hideModal');
        btn.triggerEventHandler('click');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('dispatched the correct action when invoking hideModal()', () => {
        const spy = spyOn(store, 'dispatch');
        const action = actions.showAddEditNoteModal({ showAddEditNoteModal: false });
        component.hideModal();
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('invokes the function patchFormFields when form mode is editing', () => {
        // tests passes but reponse should be 1 object not 2
        // [ Object({ body: 'lorem', title: 't', id: 23, priority: 'haute' }) ],
        // [ Object({ body: 'lorem', title: 't', id: 23, priority: 'haute' }) ].
        const spy = spyOn(component.noteForm, 'patchValue').and.callThrough();
        selectors.addEditNoteModalMode.setResult(false);
        store.refreshState()
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

});
