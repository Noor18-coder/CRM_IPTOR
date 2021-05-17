import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export class UserMock {
    static getUserInfo(): apiModels.UserItem {
        return {
           
        user: faker.name.findName(),
        handler: faker.name.findName(),
        defaultSalesOrderType: faker.random.alphaNumeric(7),
        description: faker.name.firstName(7) + " " + faker.name.lastName,
        language: faker.random.alphaNumeric(7)
           
        };
    }
}
