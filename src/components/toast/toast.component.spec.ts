import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Initialstate } from '../../app/reducers/index';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let store: MockStore;
  const initialState = Initialstate;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Toast component ', () => {
    expect(component).toBeTruthy();
  });

  it('create Store dependency', () => {
    expect(store).toBeTruthy();
  });

  it('defines the values of isToastVisible$ and isAddMode$ on ngOnInit', (() => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isToastVisible$).toBeDefined();
    expect(component.isAddMode$).toBeDefined();
  }))

  it('should render text - La note a été ajoutée !', () => {
    component.isToastVisible$ = of(true);
    component.isAddMode$ = of(true);
    fixture.detectChanges();
    const text = fixture.debugElement.query(By.css('div')).nativeElement.innerText;
    expect(text).toEqual('La note a été ajoutée !');
  });

  it('should render text - La note a été modifiée !', () => {
    component.isToastVisible$ = of(true);
    component.isAddMode$ = of(false);
    fixture.detectChanges();
    const text = fixture.debugElement.query(By.css('div')).nativeElement.innerText;
    expect(text).toEqual('La note a été modifiée !');
  })
});