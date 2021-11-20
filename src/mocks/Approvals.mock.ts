import * as faker from 'faker/locale/en_US';
import * as apiModels from '../helpers/Api/models';

export default class ApprovalsMock {
  static getErrorMessages(num: number): apiModels.ErrorMessage[] {
    return Array(num).fill({
      type: faker.random.word(),
      id: faker.random.word(),
      key: faker.random.word(),
      field: faker.random.word(),
      text: faker.random.word(),
    });
  }

  static getError(): string {
    return 'Something went wrong';
  }

  static getApprovalLogAddRequestParams(): apiModels.ApprovalLogAddRequestParams {
    return {
      approver: faker.internet.userAgent(),
      opportunityId: faker.random.uuid(),
      salesStage: faker.random.word(),
      levelId: faker.random.number({ max: 99999 }),
      user: faker.internet.userName(),
      approvalLogStatus: faker.random.word(),
    };
  }

  static getApprovalLogAddResponse(withMessage?: boolean): apiModels.ApprovalLogAddResponse {
    const response = {
      approver: faker.internet.userAgent(),
      opportunityId: faker.random.uuid(),
      salesStage: faker.random.word(),
      levelId: faker.random.number({ max: 99999 }),
      user: faker.internet.userName(),
      approvalLogStatus: faker.random.word(),
      approvalLogId: faker.random.uuid(),
    };
    const messages = this.getErrorMessages(1);

    if (withMessage) {
      return { ...response, messages };
    }

    return response;
  }

  static getApprovalLogsParams(): apiModels.ApprovalLogsParams {
    return {
      opportunityId: faker.random.uuid(),
    };
  }

  static getApprovalLogsDefault(num: number): apiModels.ApprovalLogsDefault[] {
    return Array(num).fill({
      approvalLogId: faker.random.uuid(),
      opportunity: faker.random.uuid(),
      user: faker.internet.userName(),
      salesStage: faker.random.word(),
      levelId: faker.random.number({ max: 99999 }),
      approver: faker.internet.userName(),
      approvalLogStatus: faker.random.word(),
      userDescription: faker.random.words(5),
      userRole: faker.random.word(),
    });
  }

  static getApprovalLogsResponse(num: number): apiModels.ApprovalLogsResponse {
    return {
      data: {
        items: this.getApprovalLogsDefault(num),
      },
    };
  }

  static getAllNotesParams(): apiModels.AllNotesParams {
    return {
      parentFile: 'SROMOPAL',
      parentId: faker.random.uuid(),
    };
  }

  static getAllNotesDefault(parentId: string): apiModels.AllNotesDefault {
    return {
      noteId: faker.random.uuid(),
      creationDate: faker.date.past().toISOString(),
      parentFile: 'SROMOPAL',
      author: faker.random.number({ max: 99999 }),
      text: faker.lorem.paragraph(1),
      changedDate: faker.date.past().toDateString(),
      changedTime: faker.date.past().toTimeString(),
      changedBy: faker.internet.userName(),
      parentId,
    };
  }

  static getAllNotesResponse(parentId: string): apiModels.AllNotesResponse {
    return {
      data: {
        items: this.getAllNotesDefault(parentId),
      },
    };
  }

  static getDeleteApprovalLogsParams(): apiModels.DeleteApprovalLogsParams {
    return {
      opportunityId: faker.random.uuid(),
      approvalLogId: faker.random.uuid(),
    };
  }
}
