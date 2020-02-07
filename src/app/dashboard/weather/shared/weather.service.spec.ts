import { fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('WeatherService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: WeatherService;
  const dummyWeatherResponse = {
    cod: 200,
    message: 0,
    list: [
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581195600,
        main: {
          temp: -1.09
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-08 12:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581238800,
        main: {
          temp: 4.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-09 12:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      },
      {
        dt: 1581066000,
        main: {
          temp: -0.86
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 2.47,
          deg: 101
        },
        sys: {
          pod: 'd'
        },
        dt_txt: '2020-02-07 09:00:00'
      }
    ],
    city: {
      id: 2921267,
      name: 'Georgensgmund',
      coord: {
        lat: 49.1897,
        lon: 11.0167
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    injector = getTestBed();
    service = injector.get(WeatherService);
    httpMock = injector.get(HttpTestingController);

    // @ts-ignore
    spyOn(window, 'Date').and.returnValue(new Date('2020-02-07'));
  });

  describe('getWeatherForLatitudeAndLongitude', () => {
    test('should return a forecast object with 3 weather information objects for valid coordinates', fakeAsync(() => {
      service
        .getWeatherForLatitudeAndLongitude$(49.1897, 11.0167)
        .subscribe(result => {
          expect(result.weatherInformation.length).toEqual(3);
        });
      const req = httpMock.expectOne(
        'http://api.openweathermap.org/data/2.5/forecast?lat=49.1897&lon=11.0167&APPID=871403311831b90480a82ab10f71d6a9&units=metric'
      );
      req.flush(dummyWeatherResponse);
      tick();
    }));

    test('should throw a error for invalid coordinates', fakeAsync(() => {
      service.getWeatherForLatitudeAndLongitude$(99.197, 99.0167).subscribe(
        result => expect(result).toEqual(0),
        err => expect(err).not.toBeUndefined()
      );
      const req = httpMock.expectOne(
        'http://api.openweathermap.org/data/2.5/forecast?lat=99.197&lon=99.0167&APPID=871403311831b90480a82ab10f71d6a9&units=metric'
      );
      req.flush({ cod: 400, message: '99.197 is not a float' });
      tick();
    }));
  });

  describe('getWeatherForCity', () => {
    test('should return a forecast object with 3 weather information objects for valid city name', fakeAsync(() => {
      service.getWeatherForGermanCity$('Georgensgmuend').subscribe(result => {
        expect(result.weatherInformation.length).toEqual(3);
      });
      const req = httpMock.expectOne(
        'http://api.openweathermap.org/data/2.5/forecast?q=Georgensgmuend,DE&APPID=871403311831b90480a82ab10f71d6a9&units=metric'
      );
      req.flush(dummyWeatherResponse);
      tick();
    }));

    test('should throw a error for invalid cityName', fakeAsync(() => {
      service.getWeatherForGermanCity$('G-Town').subscribe(
        result => expect(result).toEqual(0),
        err => expect(err).not.toBeUndefined()
      );
      const req = httpMock.expectOne(
        'http://api.openweathermap.org/data/2.5/forecast?q=G-Town,DE&APPID=871403311831b90480a82ab10f71d6a9&units=metric'
      );
      req.flush({ cod: 404, message: 'city not found' });
      tick();
    }));
  });
});
