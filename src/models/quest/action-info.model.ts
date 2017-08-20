import { Model } from '../model';

export class ActionInfo extends Model {
  public info: string;
  public dialog: string;
  public additionalInfo: any;
  public stage_id: number;
  public scene_id: number;
  public id: number;
}
