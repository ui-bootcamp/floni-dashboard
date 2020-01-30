import { getTestBed, TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('NewsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: NewsService;
  const dummyArticles = [
    {
      title: 'Heizkosten: Gaspreise sinken ',
      description: 'Der Gasmarkt hat sich grundlegend gewandelt.',
      link:
        'http://www.spiegel.de/wirtschaft/service/gaspreise-sinken-auf-tiefsten-stand-seit-zwoelf-jahren-a-1163414.html#ref=rss',
      createdAt: '2017-08-21T06:20:30.770Z',
      updatedAt: '2017-08-21T06:20:30.770Z',
      id: 1,
      isFavorite: false
    },
    {
      title: 'Ford zahlt 10 Millionen Dollar wegen Diskriminierungsklage',
      description: 'In Ford-Werken in Chicago wurden Mitarbeiter belästigt ',
      link:
        'http://www.spiegel.de/wirtschaft/unternehmen/ford-zahlt-10-millionen-dollar-wegen-diskriminierungsklage-a-1163413.html#ref=rss',
      createdAt: '2017-08-21T06:20:30.772Z',
      updatedAt: '2017-08-21T06:20:30.772Z',
      id: 2,
      isFavorite: false
    },
    {
      title: 'Nachwuchs für US-Sänger: Jetzt kommts Thicke',
      description: 'Es ist nicht lange her, da verlor Robin Thicke ...',
      link:
        'http://www.spiegel.de/panorama/leute/robin-thicke-freundin-von-us-saenger-erwartet-ein-kind-a-1163416.html#ref=rss',
      createdAt: '2017-08-21T06:20:30.773Z',
      updatedAt: '2017-08-21T06:20:30.773Z',
      id: 3,
      isFavorite: false
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });
    injector = getTestBed();
    service = injector.get(NewsService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should return all articles', done => {
    service.getArticles().subscribe(articles => {
      expect(articles.length).toEqual(3);
      expect(articles).toEqual(dummyArticles);
      done();
    });

    const req = httpMock.expectOne(`${environment.baseUrl}news`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArticles);
  });

  it('should only return entries which match the search', done => {
    service.getArticlesWith('thick').subscribe(articles => {
      expect(articles.length).toEqual(1);
      done();
    });

    const req = httpMock.expectOne(`${environment.baseUrl}news`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArticles);
  });

  test('should return empty array if there are no hits', done => {
    service.getArticlesWith('thickkkkk').subscribe(articles => {
      expect(articles.length).toEqual(0);
      done();
    });

    const req = httpMock.expectOne(`${environment.baseUrl}news`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArticles);
  });
});
