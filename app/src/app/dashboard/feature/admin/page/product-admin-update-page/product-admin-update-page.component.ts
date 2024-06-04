import {Component, Input, OnInit, Signal, WritableSignal, computed, inject, signal} from '@angular/core';
import {Product} from '@product-feature';
import {AppRoutes, CardActionDefinition, CardComponent, FormBuilderComponent} from '@shared';
import {ProductService, ProductUtilsService} from 'app/dashboard/feature/product/service';
import {FormConfig} from 'app/shared/ui/form/data/config/form.config';
import {tap} from 'rxjs';
import {JsonPipe} from '@angular/common';
import {ShelveUtilsService, Stock, StockService, StockUtilsService} from '@shelve-feature';
import {Router} from '@angular/router';
import {FormAction} from '@admin-feature';
import {ProductAdminFormComponent} from '../../component';


@Component({
  selector: 'app-product-admin-update-page',
  standalone: true,
  templateUrl: './product-admin-update-page.component.html',
  styleUrl: './product-admin-update-page.component.scss',
  imports: [FormBuilderComponent, JsonPipe, CardComponent, ProductAdminFormComponent]
})
export class ProductAdminUpdatePageComponent implements OnInit {
  @Input() id!: string;
  protected productService: ProductService = inject(ProductService);
  protected stockService: StockService = inject(StockService);
  public detail$: WritableSignal<Product | null> = signal(null);

  ngOnInit(): void {
    this.productService.detail(this.id).pipe(
      tap((detail: Product) => this.detail$.set(detail))
    ).subscribe()


  }
}
