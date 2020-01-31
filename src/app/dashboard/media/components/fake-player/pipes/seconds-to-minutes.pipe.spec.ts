import { SecondsToMinutesPipe } from './seconds-to-minutes.pipe';

describe('SecondsToMinutesPipe', () => {
  test('should return whole minutes if value % 60 = 0', () => {
    const pipe = new SecondsToMinutesPipe();
    expect(pipe.transform(60)).toEqual('01:00');
  });

  test('should return only seconds with value < 60', () => {
    const pipe = new SecondsToMinutesPipe();
    expect(pipe.transform(45)).toEqual('00:45');
  });

  test('should return minutes and seconds if value > 60', () => {
    const pipe = new SecondsToMinutesPipe();
    expect(pipe.transform(100)).toEqual('01:40');
  });
});
