import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NotePreviewComponent } from './note-preview.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NoteService } from 'src/services/note.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Initialstate } from 'src/app/reducers';
import { of } from 'rxjs';
import { INote, IState } from 'src/services/note.model';
import * as selectors from '../../app/reducers/selectors/selectors';
import * as actions from '../../app/reducers/actions/actions';
import { Location } from '@angular/common';
import { routes } from '../home/home-routing.module';

describe('NotePreviewComponent', () => {
  let component: NotePreviewComponent;
  let fixture: ComponentFixture<NotePreviewComponent>;
  let router: Router;
  let location: Location;
  let activatedRoute: ActivatedRoute;
  let service: NoteService;
  let store: MockStore<IState>;
  const initialState = Initialstate;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotePreviewComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: NoteService },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectors.selectNotes,
              value: [
                { id: 0, title: 'edczezvcze', priority: 'haute', body: 'cdcdczdcezcezczec' },
                { id: 1, title: 'fbfbfdb', priority: 'moyenne', body: 'sdvdv' },
                { id: 2, title: 'fbfbfb', priority: 'elevee', body: 'vvvvvvvvvvvvvvvvvvv' },
                { id: 3, title: 'edczbgfngfngnezvcze', priority: 'haute', body: 'sdvdsvdsvdsv' }
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
    activatedRoute = TestBed.inject(ActivatedRoute);
    store = TestBed.inject(MockStore);
    location = TestBed.inject(Location);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('displays warning message when there are not any notes', () => {
    component.notes$ = of([]);
    fixture.detectChanges();
    const noNotesWarning = fixture.debugElement.query(By.css('#no-notes-warning'));
    const notesContainer = fixture.debugElement.query(By.css('#notes-container'));
    expect(noNotesWarning).toBeTruthy();
    expect(notesContainer).toBeFalsy();
  });

  it('sets the property selected correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.selected).toBe(2);
    /* There should be 2 previews in the template but only 1 ???? */
  });

  it('renders the notes based on the selected priority', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let expectedData!: INote[];
    component.notes$.subscribe(value => expectedData = value);
    expect(expectedData.length).toBe(2);
    expect(expectedData[0].priority).toBe('haute');
    expect(expectedData[1].priority).toBe('haute');
  });

  it('updates the URL with the correct priority', (fakeAsync(() => {
    component.ngOnInit();
    let routeParams;
    activatedRoute.params.subscribe(params => routeParams = params)
    router.navigate([`notes/${routeParams?.['priority']}`]);
    tick();
    expect(location.path()).toBe('/notes/haute');
  })));

  it('creates a subscription for activatedRoute parameters ngOnInit()', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component['sub']).toBeTruthy();
  });

  it('destroys the subscription to activatedRoute parameters on ngDestroy()', () => {
    const spy = spyOn(component['sub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('displays the notes previews when there are notes', () => {
    const dummyData: INote[] = [
      { id: 0, title: 'edczezvcze', priority: 'haute', body: 'cdcdczdcezcezczec' },
      { id: 1, title: 'fbfbfdb', priority: 'moyenne', body: 'sdvdv' },
      { id: 2, title: 'fbfbfb', priority: 'elevee', body: 'vvvvvvvvvvvvvvvvvvv' },
      { id: 3, title: 'edczbgfngfngnezvcze', priority: 'haute', body: 'sdvdsvdsvdsv' }
    ];
    component.notes$ = of(dummyData);
    fixture.detectChanges();
    const notePreviewCard = fixture.debugElement.queryAll(By.css('.note-preview'));
    expect(notePreviewCard.length).toBe(4);
  });

  it('sets the id of the selected note correctly when invoking handleSelectedNote()', () => {
    const dummyData: INote = { id: 2, title: 'fbfbfb', priority: 'elevee', body: 'vvvvvvvvvvvvvvvvvvv' };
    component.selected = 0;
    component.handleSelectedNote(dummyData);
    fixture.detectChanges();
    expect(component.selected).toBe(dummyData.id)
  });

  it('displays the add/edit modal when invoking showAddEditModal()', () => {
    const dummyData: INote[] = [
      { id: 0, title: 'edczezvcze', priority: 'haute', body: 'cdcdczdcezcezczec' },
      { id: 1, title: 'fbfbfdb', priority: 'moyenne', body: 'sdvdv' },
      { id: 2, title: 'fbfbfb', priority: 'elevee', body: 'vvvvvvvvvvvvvvvvvvv' },
      { id: 3, title: 'edczbgfngfngnezvcze', priority: 'haute', body: 'sdvdsvdsvdsv' }
    ];
    component.notes$ = of(dummyData);
    fixture.detectChanges();
    const serviceSpy = spyOn(service, 'showAddEditModalForUpdating');
    const btn = fixture.debugElement.queryAll(By.css('.btn-update-note'));
    btn[2].triggerEventHandler('click', dummyData[2]);
    expect(serviceSpy).toHaveBeenCalledWith(dummyData[2]);
  });

  it('shows the modal when invoking showDeleteNoteModal()', () => {
    const action = actions.getNoteId({ selectedNoteId: 2 });
    const storeSpy = spyOn(store, 'dispatch');
    const serviceSpy = spyOn(service, 'showRemoveNoteModal');
    component.showDeleteNoteModal(2);
    expect(storeSpy).toHaveBeenCalledWith(action)
    expect(serviceSpy).toHaveBeenCalled();
  });

});
