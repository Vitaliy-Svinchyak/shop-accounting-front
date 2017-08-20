import { Model } from '../model';
import { MappedClass } from '../../app/core/decorators/mapped-class.decorator';
import { Scene } from './scene.model';

export class Quest extends Model {
  public id: number;
  public short_description: string;
  public author_id: number;
  public time_for_execution: string;
  public quest_type: number;
  public quest_info: string;
  public redirect: number;

  @MappedClass(Scene) public scenes: Scene[];
}
