import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppRoutes } from '@shared';
import { ApiService } from '@api';
import { SecurityService } from '@security';
import { TranslateModule } from '@ngx-translate/core';

interface DashboardMenuItem {
  link: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-dashboard-router',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, TranslateModule],
  templateUrl: './dashboard-router.component.html',
  styleUrls: ['./dashboard-router.component.scss'],
})
export class DashboardRouterComponent implements OnInit {
  protected securityService: SecurityService = inject(SecurityService);
  protected router: Router = inject(Router);
  routes = AppRoutes;
  showMobileMenu: boolean = true;
  currentRoute!: string;
  menu: DashboardMenuItem[] = [
    {
      link: this.routes.SHELVE_LIST,
      icon: 'fa-shelves',
      label: 'header.title.shelve',
    },
    {
      link: this.routes.PRODUCT_LIST,
      icon: 'fa-grid-horizontal',
      label: 'header.title.product',
    },
    {
      link: this.routes.CONSUMPTION_LIST,
      icon: 'fa-person-carry-box',
      label: 'header.title.consumption',
    },
    {
      link: this.routes.MEMBER_LIST,
      icon: 'fa-users-gear',
      label: 'header.title.member',
    },
  ];

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isActive(link: string): boolean {
    return this.currentRoute === link;
  }
}
