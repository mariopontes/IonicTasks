import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavController, MenuController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnInit {

  @Input() menuId: string;

  constructor(
    private authService: AuthService,
    private menuController: MenuController,
    private navController: NavController,
    private overlayService: OverlayService) { }

  async ngOnInit(): Promise<void> {
    if (!(await this.menuController.isEnabled(this.menuId))) {
      this.menuController.enable(true, this.menuId)
    }
  }

  async logout(): Promise<void> {
    await this.overlayService.alert({
      message: 'Do you really want to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.authService.logout();
            await this.menuController.enable(false, this.menuId)
            this.navController.navigateRoot('/login');
          }
        },
        'No'
      ]
    })
  };

}
