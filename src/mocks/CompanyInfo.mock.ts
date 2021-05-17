import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export class CompanyInfoMock {
  static getCompanyInfoItem(): apiModels.CompanyInfoItemResponse {
    return {
      IptorAPI: '1.0',
      items: [{
        companyCode: faker.random.alphaNumeric(7),
        companyShortName: faker.company.companyName(),
        name: faker.company.companyName(),
        selected: faker.random.boolean()
      }],
      id: 'kdkdikd'
    };
  }

  // companyMock = (): apiModels.CompanyInfoItem => {
  //   return {
  //       companyCode : faker.random.alphaNumeric(7),
  //       companyShortName : faker.company.companyName(),
  //       name : faker.company.companyName(), 
  //       selected: faker.random.boolean()
  //     }

  // };



  static getCompanies(num: number): apiModels.CompanyInfoItem[] {
    return Array(num).fill({
      companyCode: faker.random.alphaNumeric(7),
      companyShortName: faker.company.companyName(),
      name: faker.company.companyName(),
      selected: faker.random.boolean()
    }
    );
  }

}
