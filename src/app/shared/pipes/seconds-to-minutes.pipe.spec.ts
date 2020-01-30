import { SecondsToMinutesPipe } from './seconds-to-minutes.pipe';

describe('SecondsToMinutesPipe', () => {
  it('should return minutes', () => {
    const pipe = new SecondsToMinutesPipe();
    expect(pipe.transform(60)).toEqual('01:00');
  });

  it('should return only seconds', () => {
    const pipe = new SecondsToMinutesPipe();
    expect(pipe.transform(45)).toEqual('00:45');
  });

  it('should return minutes and seconds', () => {
    const pipe = new SecondsToMinutesPipe();
    expect(pipe.transform(100)).toEqual('01:40');
  });
});
