import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFullComponent } from './note-full.component';

describe('NoteFullComponent', () => {
  let component: NoteFullComponent;
  let fixture: ComponentFixture<NoteFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteFullComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
