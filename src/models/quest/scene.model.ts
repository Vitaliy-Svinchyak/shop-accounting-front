import { Model } from '../model';
import { Autowired } from '../../app/core/decorators/autowired.decorator';
import { Quest } from './quest.model';
import { MappedClass } from '../../app/core/decorators/mapped-class.decorator';
import { SceneStage } from './scene-stage.model';

export class Scene extends Model {
  public id: number;
  public quest_id: number;
  public name: string;
  public image: string;
  @Autowired(Quest) public quest: Quest;
  @MappedClass(SceneStage) public scene_stages: SceneStage[];
}
