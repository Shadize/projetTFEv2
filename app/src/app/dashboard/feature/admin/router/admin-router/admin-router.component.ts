import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutes, CardComponent, CardHeaderComponent} from '@shared';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {IconMenu} from '../../../../../shared/ui/interface';

@Component({
  selector: 'app-admin-router',
  standalone: true,
  imports: [CommonModule, CardComponent, CardHeaderComponent, RouterOutlet, RouterLink],
  templateUrl: './admin-router.component.html',
  styleUrls: ['./admin-router.component.scss']
})
export class AdminRouterComponent implements OnInit {
  protected menu: IconMenu[] = [];
  protected title: string = '';
  private router: Router = inject(Router);

  ngOnInit() {
    this.initMenu();
    this.setTitle();
  }

  private setTitle(): void {
    const path = this.router.url.split('/');
    this.title = `admin-feature.title.${path[path.length - 1]}`
  }

  private initMenu(): void {
    this.menu = [
      {icon: 'fa-light fa-grid-horizontal', isActive: true, link: AppRoutes.ADMIN_PRODUCT},
      {icon: 'fa-light fa-shelves', isActive: false, link: AppRoutes.ADMIN_SHELVES},
      {icon: 'fa-light fa-users', isActive: false, link: AppRoutes.ADMIN_MEMBER}
    ]
  }

  protected readonly routes = AppRoutes;

  navigate(item: IconMenu): void {
    this.router.navigate([item.link]).then(() => {
      this.menu = this.menu.map(m => ({
        ...m,
        isActive: m.icon === item.icon
      }));
      this.setTitle();
    });
  }
}
