import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AppRoutes} from '@shared';
import {ApiService} from '@api';
import {SecurityService} from '@security';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-router',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, TranslateModule],
  templateUrl: './dashboard-router.component.html',
  styleUrls: ['./dashboard-router.component.scss']
})
export class DashboardRouterComponent {
  protected securityService:SecurityService = inject(SecurityService);
  routes= AppRoutes;
}
