import { Model } from '../model';
import { Autowired } from '../../app/core/decorators/autowired.decorator';
import { SceneStage } from './scene-stage.model';
import { SceneStageActionType } from './scene-stage-action-type.enum';
import { ActionInfo } from './action-info.model';

export class SceneStageAction extends Model {
  public id: number;
  public scene_stage_id: number;
  public text: string;
  public action_type: SceneStageActionType;
  protected disabled: boolean = false;

  @Autowired(SceneStage) public sceneStage: SceneStage;

  private action_info: any;

  /**
   * @return {boolean}
   */
  public isEnabled(): boolean {
    return !this.disabled;
  }

  /**
   * @return {boolean}
   */
  public isDisaled(): boolean {
    return this.disabled;
  }

  public enable(): void {
    this.disabled = false;
  }

  public disable(): void {
    this.disabled = true;
  }

  public get actionInfo(): ActionInfo {
    if (typeof this.action_info === 'string') {
      this.action_info = new ActionInfo(JSON.parse(<string>this.action_info));
    }

    return this.action_info;
  }
}
