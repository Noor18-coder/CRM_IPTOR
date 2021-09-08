/**
 * Api Request Object
 */
import { ApiRequestControls } from './models';

export class ApiRequest<T> {
  IptorAPI: string;

  id: string;

  constructor(public method: string, public params?: T, public control?: ApiRequestControls) {
    this.IptorAPI = process.env.REACT_APP_IPTOR_API_VERSION ?? '';
    this.id = process.env.REACT_APP_IPTOR_API_ID ?? '';
  }
}
