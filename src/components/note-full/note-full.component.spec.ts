import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoteFullComponent } from './note-full.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { routes } from '../home/home-routing.module';
import { provideMockStore } from '@ngrx/store/testing';
import { Initialstate } from 'src/app/reducers';
import { INote, IState } from 'src/services/note.model';
import * as selectors from '../../app/reducers/selectors/selectors';
import { By } from '@angular/platform-browser';

describe('NoteFullComponent', () => {
  let component: NoteFullComponent;
  let fixture: ComponentFixture<NoteFullComponent>;
  let router: Router;
  let location: Location;
  let activatedRoute: ActivatedRoute;
  const initialState = Initialstate;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteFullComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectors.selectSingleNote(2),
              value: [
                { id: 2, title: 'fbfbfb', priority: 'elevee', body: 'vvvvvvvvvvvvvvvvvvv' },
              ]
            }
          ]
        }),
        { provide: ActivatedRoute, useValue: { params: of({ id: 2, priority: 'haute', title: 'lorem', body: 'ipsum dolor' }) } }
      ]
    })
      .compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    activatedRoute = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the URL with the correct priority', (fakeAsync(() => {
    component.ngOnInit();
    let routeParams;
    activatedRoute.params.subscribe(params => routeParams = params)
    router.navigate([`notes/${routeParams?.['priority']}/${routeParams?.['id']}`]);
    tick();
    expect(location.path()).toBe('/notes/haute/2');
  })));

  it('creates a subscription for activatedRoute parameters on ngOnInit()', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component['sub']).toBeTruthy();
  });

  it('destroys the subscription to activatedRoute parameters on ngDestroy()', () => {
    const spy = spyOn(component['sub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('displays the full note when there is a note', () => {
    const dummyData: INote[] = [
      { id: 3, title: 'edczezvcze', priority: 'haute', body: 'cdcdczdcezcezczec' }
    ];
    component.note$ = of(dummyData);
    fixture.detectChanges();
    const fullNote = fixture.debugElement.queryAll(By.css('#full-note'));
    expect(fullNote.length).toBe(1);
  });

});
