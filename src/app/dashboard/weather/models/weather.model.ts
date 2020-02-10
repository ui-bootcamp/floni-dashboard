export class Weather {
  constructor(
    public date: Date,
    public description: string,
    public temperature: string,
    public iconId: string
  ) {}

  public getIconUrl(): string {
    return `http://openweathermap.org/img/wn/${this.iconId}@2x.png`;
  }
}
