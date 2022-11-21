import {ChapterService} from './chapter.service';
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;
import {from} from "rxjs";
import {Chapter} from "../types/chapter";
import {PersonChapter} from "../types/personChapter";

describe('ChapterService', () => {
  let chapterService: ChapterService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    chapterService = new ChapterService(httpServiceMock);
  })

  it('should be created', () => {
    expect(chapterService).toBeTruthy();
  });

  it('should return expected chapters', (done: DoneCallback) => {

    const expectedChapters: Chapter[] = [
      {"id": 1, "chapterName": "Chapter From"},
      {"id": 2, "chapterName": "Chapter Back"},
      {"id": 3, "chapterName": "Chapter QA"}
    ]

    httpServiceMock.get.mockReturnValueOnce([expectedChapters]);

    from(chapterService.getChapters())
      .subscribe((chapters) => {
        // expected value
        expect(chapters).toEqual(expectedChapters)

        // chapters length is expected to be greater than 0
        expect(chapters.length).toBeGreaterThan(0)

        chapters.forEach((chapter) => {
          // ChapterName is expected not to be null
          expect(chapter.chapterName).not.toBeNull()
        })

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return expected chapters assigned to a person', (done: DoneCallback) => {

    const id: number = 4

    const expectedPersonChapter: PersonChapter = {
      "personTo": null,
      "chapterToList": [
        {"id": 1, "chapterName": "Chapter From"},
        {"id": 2, "chapterName": "Chapter Back"}
      ],
      "user": "luischi"
    }

    httpServiceMock.get.mockReturnValueOnce([expectedPersonChapter]);

    from(chapterService.getChapterByPerson(id))
      .subscribe((personChapter) => {
        // expected value
        expect(personChapter).toEqual(expectedPersonChapter)

        // chapterToList Length is expected to be 2
        expect(personChapter.chapterToList.length).toBe(2)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return a null chapterToList if the person has no chapters assigned', (done: DoneCallback) => {

    const id: number = 28

    const expectedPersonChapter: PersonChapter = {
      "personTo": null,
      "chapterToList": null,
      "user": null
    }

    httpServiceMock.get.mockReturnValueOnce([expectedPersonChapter]);

    from(chapterService.getChapterByPerson(id))
      .subscribe((personChapter) => {
        // expected value
        expect(personChapter).toEqual(expectedPersonChapter)

        // chapterToList is expected to be null
        expect(personChapter.chapterToList).toBeNull()

        // personTo is expected to be null
        expect(personChapter.personTo).toBeNull()

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should assign a chapter list to a person', (done: DoneCallback) => {

    const newPersonChapter: PersonChapter = {
      "personTo": null,
      "chapterToList": [
        {
          "id": 1,
          "chapterName": "Chapter From"
        },
        {
          "id": 2,
          "chapterName": "Chapter Back"
        }
      ],
      "user": "luischi"
    }

    httpServiceMock.post.mockReturnValueOnce([newPersonChapter]);

    from(chapterService.addPersonChapter(newPersonChapter))
      .subscribe((personChapter) => {
        // expected value
        expect(personChapter).toEqual(newPersonChapter)

        // chapterToList Length is expected to be 2
        expect(personChapter.chapterToList.length).toBe(2)

        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();

  })


});
