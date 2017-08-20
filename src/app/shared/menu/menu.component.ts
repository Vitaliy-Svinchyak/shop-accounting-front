import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { CreateShopDialogComponent } from '../../../pages/shop/create-shop-dialog/create-shop-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent {

  protected urlsWithoutMenu: string[] = [
    '/auth',
    '/quest'
  ];

  public constructor(private location: Location, private route: ActivatedRoute, public dialog: MdDialog) {
  }

  /**
   * @return {boolean}
   */
  public showMenu(): boolean {
    const path: string = this.location.path();

    for (const url of this.urlsWithoutMenu) {
      if (path.match(url)) {
        return false;
      }
    }

    return true;
  }

  public showAddShopModal(): void {
    this.dialog.open(CreateShopDialogComponent);
  }
}
