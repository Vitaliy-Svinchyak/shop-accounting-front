import { Model } from '../model';

export class Armor extends Model {
  public id: number;
  public name: string;
  public defence_type: number;
  public defence: number;
  public material_id: number;
  public image: string;
}
