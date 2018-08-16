export class CountrySave {
  public constructor(
    public countryCode: string,
    public countryNameFr: string,
    public countryNameEn: string,
    public continentCode: string) {
  }
}

export class Country {
  countryCode: string;
  countryNameFr: string;
  countryNameEn: string;
  continentCode: string;
}
