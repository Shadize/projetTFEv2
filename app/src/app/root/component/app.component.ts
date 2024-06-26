import {Component, inject, OnInit, ViewContainerRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInPageComponent} from '@security';
import {RouterOutlet} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Language} from '@core';
import {LoaderComponent} from '@shared';
import {DialogService} from '../../shared/ui/dialog/service';
import {ToastContainerComponent} from '@shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SignInPageComponent, RouterOutlet, TranslateModule, LoaderComponent, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private dialogService: DialogService = inject(DialogService);
  title = 'app';
  translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.setDefaultLang(Language.FR);
    this.translate.use(Language.FR);
    this.dialogService.setViewContainerRef(this.viewContainerRef);
  }
}
