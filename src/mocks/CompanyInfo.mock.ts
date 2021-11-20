import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export class CompanyInfoMock {
  static getCompanyInfoItem(): apiModels.CompanyInfoItemResponse {
    return {
      IptorAPI: '1.0',
      items: [
        {
          companyCode: faker.random.alphaNumeric(7),
          companyShortName: faker.company.companyName(),
          name: faker.company.companyName(),
          selected: faker.random.boolean(),
        },
      ],
      id: 'kdkdikd',
    };
  }

  static getCompanies(num: number): apiModels.CompanyInfoItem[] {
    return Array(num).fill({
      companyCode: faker.random.alphaNumeric(7),
      companyShortName: faker.company.companyName(),
      name: faker.company.companyName(),
      selected: faker.random.boolean(),
    });
  }

  static getCompaniesConstVal(): apiModels.CompanyInfoItem[] {
    return [
      { companyCode: 'vig1t13', companyShortName: 'Doyle - Bayer', name: 'Steuber - Abernathy', selected: false },
      { companyCode: 'vig1t14', companyShortName: 'Doyle - Bayer', name: 'Steuber - Abernathy', selected: true },
    ];
  }
}
