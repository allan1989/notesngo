export interface INote {
  id: number,
  title: string,
  priority: string,
  body: string
}

export interface IState {
  data: INote[],
  showRemoveNoteModal: boolean,
  selectedNoteId: number,
  showAddEditNoteModal: boolean,
  isAddMode: boolean,
  showAddEditNoteToast: boolean,
  selectedNote: INote[],
  updatedNote: INote[]
}

export enum PrioritiesListLabel {
  HAUTE = 'Haute',
  ELEVEE = 'Elevée',
  MOYENNE = 'Moyenne',
  BASSE = 'Basse'
}

export enum PrioritiesListValue {
  HAUTE = 'haute',
  ELEVEE = 'elevee',
  MOYENNE = 'moyenne',
  BASSE = 'basse'
}