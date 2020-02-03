import { ResultToIconPipe } from './result-to-icon.pipe';
import { Article } from '../../../news/models/article.model';

describe('ResultToIconPipe', () => {
  test('should return receipt for article type', () => {
    const article = new Article(
      1,
      'Heizkosten: Gaspreise sinken ',
      'Der Gasmarkt hat sich grundlegend gewandelt.',
      'http://www.spiegel.de/wirtschaft/service/gaspreise-sinken-auf-tiefsten-stand-seit-zwoelf-jahren-a-1163414.html#ref=rss',
      '2017-08-21T06:20:30.770Z',
      '2017-08-21T06:20:30.770Z'
    );
    const pipe = new ResultToIconPipe();
    expect(pipe.transform(article)).toEqual('receipt');
  });
});
