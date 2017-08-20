import { Model } from '../model';
import { Autowired } from '../../app/core/decorators/autowired.decorator';
import { Scene } from './scene.model';
import { SceneStageAction } from './scene-stage-action.model';
import { MappedClass } from '../../app/core/decorators/mapped-class.decorator';

export class SceneStage extends Model {
  public id: number;
  public scene_id: number;
  public text: string;

  @Autowired(Scene) public scene: Scene;
  @MappedClass(SceneStageAction) public scene_stage_actions: SceneStageAction[];

  /**
   * @return {SceneStageAction[]}
   */
  public getEnabledStageActions(): SceneStageAction[] {
    return this.scene_stage_actions.filter((s: SceneStageAction) => s.isEnabled());
  }

  public get textCollection(): any[] {
    console.log(this.text);
    return JSON.parse(this.text);
  }
}
