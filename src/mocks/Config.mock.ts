import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class ConfigMock {
  static getStageInfo(num: number): apiModels.StageInfo[] {
    return Array(num).fill({
      salesStage: faker.random.word(),
      active: faker.random.boolean(),
      description: faker.random.words(5),
      probability: faker.random.number({ max: 99999 }),
    });
  }

  static getStageInfoResponse(num?: number): apiModels.StageInfoResponse {
    return {
      data: {
        items: this.getStageInfo(num ?? 1),
      },
    };
  }

  static getCurrencyItem(num: number): apiModels.CurrencyItem[] {
    return Array(num).fill({
      currency: faker.finance.currencyCode(),
      description: faker.random.words(5),
      currencyISO: faker.finance.currencyName(),
      decimalsForAmount: faker.random.number({ max: 9 }),
      decimalsForAmountToDisplay: faker.random.number({ max: 9 }),
    });
  }

  static getCurrencyInfoResponse(num: number): apiModels.CurrencyInfoResponse {
    return {
      data: {
        items: this.getCurrencyItem(num),
      },
    };
  }

  static getCountryInfo(num: number): apiModels.CountryInfo[] {
    let count = 0;
    const country: apiModels.CountryInfo[] = [];

    while (count < num) {
      if (country.length === 0) {
        country.push({
          country: faker.address.countryCode(),
          validateCountry: faker.random.boolean(),
          ISOCountry: faker.address.countryCode(),
          description: faker.address.country(),
          countryIdIn: faker.address.countryCode(),
        });
        count += 1;
      } else {
        const newCountry = faker.address.country();
        if (country.findIndex((item) => item.country === newCountry) < 0) {
          country.push({
            country: newCountry,
            validateCountry: faker.random.boolean(),
            ISOCountry: faker.address.countryCode(),
            description: faker.address.country(),
            countryIdIn: faker.address.countryCode(),
          });
          count += 1;
        }
      }
    }

    return country;
  }

  static getCountryInfoResponse(num: number): apiModels.CountryInfoResponse {
    return {
      data: {
        items: this.getCountryInfo(num),
      },
    };
  }

  static getAreaInfo(num: number): apiModels.AreaInfo[] {
    let count = 0;
    const area: apiModels.AreaInfo[] = [];

    while (count < num) {
      if (area.length === 0) {
        area.push({
          area: faker.address.county(),
          description: faker.address.streetAddress(),
        });
        count += 1;
      } else {
        const newArea = faker.address.county();
        if (area.findIndex((item) => item.area === newArea) < 0) {
          area.push({
            area: newArea,
            description: faker.address.streetAddress(),
          });
          count += 1;
        }
      }
    }
    return area;
  }

  static getAreaInfoResponse(num: number): apiModels.AreaInfoResponse {
    return {
      data: {
        items: this.getAreaInfo(num),
      },
    };
  }

  static getDropDownValue(num: number): apiModels.DropDownValue[] {
    return Array(num).fill({
      valueField: faker.random.word(),
      fieldDescription: faker.random.words(5),
    });
  }

  static getForeCastInfo(num: number): apiModels.ForeCastInfo[] {
    return Array(num).fill({
      forecastCategory: faker.random.word(),
      description: faker.random.words(5),
    });
  }

  static getReason(num: number): apiModels.Reason[] {
    return Array(num).fill({
      reasonCode: faker.random.word(),
      description: faker.random.words(5),
    });
  }

  static getReasonCodeResponse(num?: number): apiModels.ReasonCodeResponse {
    return {
      data: {
        items: this.getReason(num ?? 1),
      },
    };
  }

  static getCountryListParams(): Required<apiModels.CountryListParams> {
    return {
      country: faker.address.countryCode(),
    };
  }

  static getDateParams(num: number): apiModels.DateParams[] {
    return Array(num).fill({
      dateFrom: faker.date.past().toISOString(),
      dateTo: faker.date.recent().toISOString(),
    });
  }

  static getReportRequestParams(num?: number): apiModels.ReportRequestParams {
    return {
      selectStage: Array(num ?? 1).fill(faker.random.word()),
      selectOppRecordType: Array(num ?? 1).fill(faker.random.word()),
      selectForecastCategory: Array(num ?? 1).fill(faker.random.word()),
      selectCloseDate: this.getDateParams(num ?? 1),
    };
  }

  static getReportsOpptyListApiMethodParams(num?: number): apiModels.ReportsOpptyListApiMethodParams {
    return {
      filterParams: this.getReportRequestParams(num ?? 1),
      limit: 100,
      offset: 0,
    };
  }
}
