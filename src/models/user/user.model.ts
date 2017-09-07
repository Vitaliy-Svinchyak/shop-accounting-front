import { Model } from '../model';

export class User extends Model {
  public name: string;
  public email: string;
  public avatar: string;
  public password: string;
  public tokenId: number;
  public token: string;
}
