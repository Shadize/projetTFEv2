import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AppRoutes} from '@shared';
import {ApiService} from '@api';
import {SecurityService} from '@security';
import {TranslateModule} from '@ngx-translate/core';

interface DashboardMenuItem{
  link:string;
  icon:string;
  label:string;
}
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
  showMobileMenu:boolean =true;
  menu:DashboardMenuItem[] = [
    {link:this.routes.SHELVE_LIST, icon:'fa-shelves', label:'header.title.shelve' },
    {link:this.routes.PRODUCT_LIST, icon:'fa-grid-horizontal', label:'header.title.product' },
    {link:this.routes.CONSUMPTION_LIST, icon:'fa-person-carry-box', label:'header.title.consumption' },
    {link:this.routes.MEMBER_LIST, icon:'fa-users-gear', label:'header.title.member' }
  ]
}
