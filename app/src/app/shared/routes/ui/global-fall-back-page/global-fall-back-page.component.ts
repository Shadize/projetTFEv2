import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {AppRoutes} from '../../enum';

@Component({
  selector: 'app-global-fall-back-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-fall-back-page.component.html',
  styleUrls: ['./global-fall-back-page.component.scss']
})
export class GlobalFallBackPageComponent {
  private router: Router = inject(Router);

  protected goBack(): void {
    this.router.navigate([AppRoutes.AUTHENTICATED]).then();
  }
}
