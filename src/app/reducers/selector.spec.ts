import * as fromSelectors from './selectors/selectors';
import { INote, IState } from "src/services/note.model";

describe('Selectors', () => {

    let initialstate: IState;
    let dummyData: INote[] = [
        { id: 0, title: 'edczezvcze', priority: 'haute', body: 'cdcdczdcezcezczec' },
        { id: 1, title: 'fbfbfdb', priority: 'moyenne', body: 'sdvdv' },
        { id: 2, title: 'fbfbfb', priority: 'elevee', body: 'vvvvvvvvvvvvvvvvvvv' },
        { id: 3, title: 'edczbgfngfngnezvcze', priority: 'haute', body: 'sdvdsvdsvdsv' }
    ];

    beforeEach(() => {
        initialstate = {
            data: dummyData,
            showRemoveNoteModal: false,
            selectedNoteId: 2,
            showAddEditNoteModal: false,
            isAddMode: true,
            showAddEditNoteToast: false,
            selectedNote: [{ id: 2, title: 'edczezvcze', priority: 'haute', body: 'cdcdczdcezcezczec' }],
            updatedNote: [{ id: 3, title: 'edczezvcze', priority: 'haute', body: 'cdcdczdcezcezczec' }]
        };
    });

    it('returns an array of notes', () => {
        const result = fromSelectors.selectNotes.projector(initialstate);
        expect(result.length).toEqual(4);
        expect(result[0].id).toEqual(0);
    });

    it('does not show remove note modal initially', () => {
        const result = fromSelectors.removeNoteModal.projector(initialstate);
        expect(result).toBe(false);
    });

    it('returns the id of the note selected', () => {
        const result = fromSelectors.selectedNoteId.projector(initialstate);
        expect(result).toEqual(2)
    });

    it('returns notes filtered by priority', () => {
        const result = fromSelectors.selectNotesByPriority('haute').projector(initialstate.data);
        expect(result.length).toEqual(2);
        expect(result[0].id).toEqual(0);
        expect(result[1].id).toEqual(3);
    });

    it('return a single note filtered by id (id from route parameters)', () => {
        const result = fromSelectors.selectSingleNote(3).projector(initialstate.data);
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(3)
    });

    it('returns a single note filtered by id (id comes from global state'), () => {
        const result = fromSelectors.selectSingleNoteForModal.projector(initialstate.data, 2);
        expect(result[0].id).toEqual(2);
    };

    it('does not show the addEditNoteModal initially', () => {
        const result = fromSelectors.addEditNoteModal.projector(initialstate);
        expect(result).toBe(false);
    });

    it('return the initial mode of the addEditNoteModal (default mode is add)', () => {
        const result = fromSelectors.AddEditNoteModalMode.projector(initialstate);
        expect(result).toBe(true);
    });

    it('does not show the toast initially', () => {
        const result = fromSelectors.showAddEditNoteToast.projector(initialstate);
        expect(result).toBe(false);
    });

    it('returns the id of the selected note', () => {
        const result = fromSelectors.getSelectedNoteId.projector(initialstate);
        expect(result).toEqual(2);
    })
});