import { Model } from '../../model';
import { Autowired } from '../../../app/core/decorators/autowired.decorator';
import { User } from '../user.model';
import { Quest } from '../../quest/quest.model';

export class UserQuest extends Model {
  public id: number;
  public user_id: number;
  public quest_id: number;

  @Autowired(Quest) public quest: Quest;
  @Autowired(User) public user: User;

  private progress_info: Object;

  public get progressInfo(): any {
    if (typeof this.progress_info === 'string') {
      this.progress_info = JSON.parse(<string>this.progress_info);
    }

    return this.progress_info;
  }
}
