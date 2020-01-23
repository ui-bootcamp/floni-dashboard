export class Article {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public link: string,
    public createdAt: string,
    public updatedAt: string
  ) {}
}
