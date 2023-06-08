import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalRemoveNoteComponent } from './modal-remove-note.component';
import { NoteService } from 'src/services/note.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Initialstate } from 'src/app/reducers';
import { INote, IState } from 'src/services/note.model';
import { Router, ActivatedRoute } from '@angular/router';
import * as selectors from '../../app/reducers/selectors/selectors';
import * as actions from '../../app/reducers/actions/actions';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ModalRemoveNoteComponent', () => {
  let component: ModalRemoveNoteComponent;
  let fixture: ComponentFixture<ModalRemoveNoteComponent>;
  let router: Router;
  let service: NoteService;
  let store: MockStore<IState>;
  const initialState = Initialstate;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRemoveNoteComponent],
      providers: [
        { provide: NoteService },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectors.selectSingleNoteForModal,
              value: [
                { id: 3, title: 'edczezvcze', priority: 'haute', body: 'cdcdczdcezcezczec' }
              ]
            }
          ]
        }),
        { provide: ActivatedRoute, useValue: { params: of({ id: 2, priority: 'haute', title: 'lorem', body: 'ipsum dolor' }) } }
      ]
    })
      .compileComponents();
    service = TestBed.inject(NoteService);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRemoveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('diplays the modal with the correct note', () => {
    const expectedNote: INote[] = [{ id: 3, title: 'edczezvcze', priority: 'haute', body: 'cdcdczdcezcezczec' }];
    let assertedNote!: INote[];
    component.showRemoveNoteModal$ = of(true);
    fixture.detectChanges();
    const modal = fixture.debugElement.query(By.css('#modal-remove'));
    component.selectedNote$.subscribe(note => assertedNote = note);
    expect(modal).toBeTruthy();
    expect(assertedNote).toEqual(expectedNote);
  });

  it('invokes the service method deleteNote() when clicking on button deleteNote', () => {
    component.showRemoveNoteModal$ = of(true);
    fixture.detectChanges();
    const btnDelete = fixture.debugElement.query(By.css('#btn-delete'));
    const spy = spyOn(service, 'deleteNote');
    btnDelete.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalledWith(3);
  });

  it('invokes the service method hideDeleteNoteModal when clicking on button cancel', () => {
    component.showRemoveNoteModal$ = of(true);
    fixture.detectChanges();
    const btnCancel = fixture.debugElement.query(By.css('#btn-cancel'));
    const spy = spyOn(service, 'hideDeleteNoteModal');
    btnCancel.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });

});