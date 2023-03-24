import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/services/note.service';
import { PrioritiesListValue } from 'src/services/note.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public priorities = PrioritiesListValue;

  constructor(
    public router: Router,
    public noteService: NoteService
  ) { }

  showAddEditForm() {
    this.noteService.showAddEditForm();
  }
}