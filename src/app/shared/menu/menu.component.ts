import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CreateShopDialogComponent } from '../../../pages/shop/create-shop-dialog/create-shop-dialog.component';
import { ShopPageService } from '../../../pages/shop/shop.page.service';

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

  public constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private service: ShopPageService
  ) {
    this.loadShops();
  }

  public loadShops(): void {
    this.service.get('').subscribe(console.log);
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
    const dialog: MdDialogRef<CreateShopDialogComponent> = this.dialog.open(CreateShopDialogComponent);

    dialog.componentInstance.onSubmit.subscribe((r: boolean) => dialog.close());
  }
}
