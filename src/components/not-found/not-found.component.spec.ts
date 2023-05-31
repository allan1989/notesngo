import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { By } from '@angular/platform-browser';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('contains the not-found-image svg file', () => {
    const image = fixture.debugElement.query(By.css('.not-found-image'));
    expect(image).toBeTruthy();
  });

  it('contains the link to go back to home page', () => {
    const link = fixture.debugElement.query(By.css('#back-home-link'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.getAttribute('routerlink')).toBe('/notes');
  });
});
