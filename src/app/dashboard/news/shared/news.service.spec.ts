import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';

import { NewsService } from './news.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { Article } from '../models/article.model';

describe('NewsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: NewsService;
  const dummyArticles = [
    new Article(
      1,
      'Heizkosten: Gaspreise sinken ',
      'Der Gasmarkt hat sich grundlegend gewandelt.',
      'http://www.spiegel.de/wirtschaft/service/gaspreise-sinken-auf-tiefsten-stand-seit-zwoelf-jahren-a-1163414.html#ref=rss',
      '2017-08-21T06:20:30.770Z',
      '2017-08-21T06:20:30.770Z'
    ),
    new Article(
      2,
      'Ford zahlt 10 Millionen Dollar wegen Diskriminierungsklage',
      'In Ford-Werken in Chicago wurden Mitarbeiter belästigt ',
      'http://www.spiegel.de/wirtschaft/unternehmen/ford-zahlt-10-millionen-dollar-wegen-diskriminierungsklage-a-1163413.html#ref=rss',
      '2017-08-21T06:20:30.772Z',
      '2017-08-21T06:20:30.772Z'
    ),
    new Article(
      3,
      'Nachwuchs für US-Sänger: Jetzt kommts Thicke',
      'Es ist nicht lange her, da verlor Robin Thicke ...',
      'http://www.spiegel.de/panorama/leute/robin-thicke-freundin-von-us-saenger-erwartet-ein-kind-a-1163416.html#ref=rss',
      '2017-08-21T06:20:30.773Z',
      '2017-08-21T06:20:30.773Z'
    )
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

  describe('getAllArticles', () => {
    test('should return all articles', fakeAsync(() => {
      service.getAllArticles().subscribe(articles => {
        expect(articles).toEqual(dummyArticles);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}news`);
      req.flush(dummyArticles);
      tick();
    }));
  });

  describe('getArticlesWhichContain', () => {
    test('should only return entries which match the search', fakeAsync(() => {
      service.getArticlesWhichContain('thick').subscribe(articles => {
        expect(articles.length).toEqual(1);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}news`);
      req.flush(dummyArticles);
      tick();
    }));

    test('should return empty array if there are no hits', fakeAsync(() => {
      service.getArticlesWhichContain('thickkkkk').subscribe(articles => {
        expect(articles.length).toEqual(0);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}news`);
      req.flush(dummyArticles);
      tick();
    }));
  });
});
