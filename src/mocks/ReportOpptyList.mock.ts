import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class ReportOpptyListMock {
  static getProductList(num: number): apiModels.ProductList[] {
    const str = faker.random.word();
    const strAr = Array(num).fill(faker.random.word());
    return Array(num).fill({
      opportunityId: faker.random.uuid(),
      itemId: faker.random.uuid(),
      itemDescription: faker.lorem.paragraph(1),
      lineNumber: faker.random.number({ max: 99999 }),
      item: faker.commerce.productName(),
      ourPrice: faker.commerce.price(),
      systemPrice: faker.commerce.price(),
      quantity: faker.random.number({ max: 99999 }),
      unit: faker.random.word(),
      isFreeOfCharge: faker.random.boolean(),
      ATRTST1ITM: faker.random.arrayElement([str, strAr]),
      ATRTST2ITM: faker.random.arrayElement([str, strAr]),
      DATE_MULTIPLE: faker.random.arrayElement([str, strAr]),
    });
  }

  static getContactsList(num: number): apiModels.ContactsList[] {
    return Array(num).fill({
      opportunityId: faker.random.uuid(),
      contactId: faker.random.uuid(),
      contactPerson: `${faker.name.firstName()} ${faker.name.lastName()}`,
      contactDC: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      mobile: faker.phone.phoneNumber(),
      fax: faker.phone.phoneNumber(),
    });
  }

  static getReportOpptyList(num: number): apiModels.ReportOpptyList[] {
    const str = faker.random.word();
    const strAr = Array(num).fill(faker.random.word());
    const numb = faker.random.number({ max: 99999 });
    const numbAr = Array(num).fill(faker.random.number({ max: 99999 }));
    return Array(num).fill({
      handler: faker.internet.userName(),
      reason: faker.random.word(),
      endDate: faker.date.past(),
      rootId: faker.random.uuid(),
      estValueSys: numb,
      logExist: faker.random.boolean(),
      contactExist: faker.random.boolean(),
      oppRecordType: faker.random.word(),
      attributeExist: faker.random.boolean(),
      opportunityId: faker.random.word(),
      estValue: numb,
      exchangeRate: numb,
      itemExist: faker.random.boolean(),
      noteExist: faker.random.boolean(),
      area: faker.random.word(),
      approvalStatus: faker.random.word(),
      probability: numb,
      taskExist: faker.random.boolean(),
      stage: faker.random.word(),
      forecastCategory: faker.random.word(),
      name: faker.random.word(),
      mustYN: faker.random.boolean(),
      salesman: faker.random.word(),
      activ: faker.random.boolean(),
      startDate: faker.random.word(),
      desc: faker.random.word(),
      customer: faker.random.word(),
      currency: faker.random.word(),
      ACTION_PENDING: faker.random.word(),
      ATRTST1: faker.random.arrayElement([str, strAr]),
      ATRTST2: faker.random.arrayElement([str, strAr]),
      CLOUD_OPP_SIZING: faker.random.arrayElement([str, strAr]),
      CLOUD_Y1: faker.random.arrayElement([numb, numbAr]),
      CLOUD_Y2: faker.random.arrayElement([numb, numbAr]),
      CLOUD_Y3: faker.random.arrayElement([numb, numbAr]),
      CLOUD_Y4: faker.random.arrayElement([numb, numbAr]),
      CLOUD_Y5: faker.random.arrayElement([numb, numbAr]),
      CLOUD_Y6: faker.random.arrayElement([numb, numbAr]),
      CLOUD_Y7: faker.random.arrayElement([numb, numbAr]),
      CMP_ONE_OFF_FEE: faker.random.arrayElement([numb, numbAr]),
      CMS_PRESALE_CONS: faker.random.arrayElement([numb, numbAr]),
      CONTACT_TERM_M: faker.random.arrayElement([numb, numbAr]),
      ENTER_ILF_OPP_VALUE: faker.random.arrayElement([numb, numbAr]),
      LEADSOURCE: faker.random.arrayElement([str, strAr]),
      LICENSE_CATEGORY: faker.random.arrayElement([str, strAr]),
      LICENSE_SUM: faker.random.arrayElement([numb, numbAr]),
      MAINT_SUPP_FIRST_Y: faker.random.arrayElement([numb, numbAr]),
      NEXTSTEP: faker.random.arrayElement([str, strAr]),
      PARTNER: faker.random.arrayElement([str, strAr]),
      PBU: faker.random.arrayElement([str, strAr]),
      PRESALE_CONULTANT: faker.random.arrayElement([str, strAr]),
      PS_REVENUE_GENERATED: faker.random.arrayElement([numb, numbAr]),
      REGION: faker.random.arrayElement([str, strAr]),
      REP_ANNUAL_REVE_CMS: faker.random.arrayElement([numb, numbAr]),
      REP_ANNUAL_REVE_CS: faker.random.arrayElement([numb, numbAr]),
      REP_ANNUAL_REVENUE: faker.random.arrayElement([numb, numbAr]),
      RLF_VALUE: faker.random.arrayElement([str, strAr]),
      SUBSCRIPTION_Y1: faker.random.arrayElement([numb, numbAr]),
      SUBSCRIPTION_Y2: faker.random.arrayElement([numb, numbAr]),
      SUBSCRIPTION_Y3: faker.random.arrayElement([numb, numbAr]),
      SUBSCRIPTION_Y4: faker.random.arrayElement([numb, numbAr]),
      SUBSCRIPTION_Y5: faker.random.arrayElement([numb, numbAr]),
      SUBSCRIPTION_Y6: faker.random.arrayElement([numb, numbAr]),
      SUBSCRIPTION_Y7: faker.random.arrayElement([numb, numbAr]),
      TEST_NUMERIC_MANDATO: faker.random.arrayElement([numb, numbAr]),
      THIRD_PARTY_COGS: faker.random.arrayElement([numb, numbAr]),
      MULTIPLE_TEXT: faker.random.arrayElement([str, strAr]),
      TEST_MULTY: faker.random.arrayElement([str, strAr]),
      products: this.getProductList(num),
      contacts: this.getContactsList(num),
    });
  }

  static getReportsOpptyResponse(num?: number): apiModels.ReportsOpptyResponse {
    return {
      control: {
        total: num ?? 1,
      },
      data: {
        items: this.getReportOpptyList(num ?? 1),
      },
    };
  }
}
