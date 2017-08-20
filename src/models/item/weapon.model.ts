import { Model } from '../model';

export class Weapon extends Model {
  public id: number;
  public name: string;
  public damage_type: number;
  public grip_type: number;
  public damage: number;
  public material_id: number;
  public image: string;
}
