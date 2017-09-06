import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/user.model';
import { HomePageService } from './home.page.service';
import { AbstractPage } from '../abstract.page';
import { UnexpectedResponse } from '../../services/http/unexpected.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    HomePageService
  ]
})
export class HomeComponent extends AbstractPage implements OnInit {

  public user: User;

  /**
   * @param {Router} router
   * @param {HomePageService} homePageService
   */
  public constructor(protected router: Router, private homePageService: HomePageService) {
    super(router);
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    // this.homePageService.getIndex()
    //   .subscribe((user: User | UnexpectedResponse) => {
    //     this.checkResponse(<UnexpectedResponse>user);
    //     this.user = <User>user;
    //   });
  }
}
