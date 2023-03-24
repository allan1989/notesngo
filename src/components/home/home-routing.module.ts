import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotePreviewComponent } from 'src/components/note-preview/note-preview.component';
import { NoteFullComponent } from 'src/components/note-full/note-full.component';
import { NotFoundComponent } from 'src/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  {
    path: 'notes',
    component: HomeComponent,
    children: [
      {
        path: ':priority',
        component: NotePreviewComponent,
        children: [
          { path: ':id', component: NoteFullComponent }
        ]
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }