import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoteService } from 'src/services/note.service';
import { provideMockStore } from '@ngrx/store/testing';
import { Initialstate } from 'src/app/reducers';
import { Location } from '@angular/common';
import { routes } from '../home/home-routing.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let location: Location;
  let service: NoteService;
  const initialState = Initialstate;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: NoteService },
        provideMockStore({ initialState }),

      ],
      imports: [RouterTestingModule.withRoutes(routes)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    service = TestBed.inject(NoteService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('creates NoteService', () => {
    expect(service).toBeTruthy();
  });

  it('creates Route dependency', () => {
    expect(router).toBeTruthy();
  });

  it('navigates to the correct path on ngInit', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/notes')
  }));

  it('defines the properties priorities', () => {
    const enumLength = Object.keys(component.priorities);
    expect(component.priorities).toBeDefined();
    expect(enumLength.length).toEqual(4);
  });

  it('renders the left panel with the 4 priorities', () => {
    const panels = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(panels.length).toEqual(4);
  })

  it('renders the AddEditNoteModal component', () => {
    const addEditNoteModalComponent = fixture.debugElement.query(By.css('app-modal-add-edit-note'));
    expect(addEditNoteModalComponent).toBeTruthy();
  });

  it('renders the Toast component', () => {
    const toastComponent = fixture.debugElement.query(By.css('app-toast'));
    expect(toastComponent).toBeTruthy();
  });

  it('renders the removeNote component', () => {
    const removeNoteComponent = fixture.debugElement.query(By.css('app-modal-remove-note'));
    expect(removeNoteComponent).toBeTruthy();
  });

  it('invokes component method showAddEditForm when click on button', () => {
    spyOn(component, 'showAddEditForm');
    component.showAddEditForm();
    expect(component.showAddEditForm).toHaveBeenCalled();
  })

  it('renders the form when clicking the button', () => {
    const serviceSpy = spyOn(service, 'showAddEditForm');
    const button = fixture.debugElement.query(By.css('.btn'));
    button.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(serviceSpy).toHaveBeenCalled();
    const modal = fixture.debugElement.query(By.css('app-modal-add-edit-note'));
    expect(modal).toBeTruthy();
  })
});
