import { Component, Input, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Product } from '@product-feature';
import { FormBuilderComponent } from '@shared';
import { ProductService, ProductUtilsService } from 'app/dashboard/feature/product/service';
import { FormConfig } from 'app/shared/ui/form/data/config/form.config';
import { tap } from 'rxjs';


@Component({
    selector: 'app-product-admin-update-page',
    standalone: true,
    templateUrl: './product-admin-update-page.component.html',
    styleUrl: './product-admin-update-page.component.scss',
    imports: [FormBuilderComponent]
})
export class ProductAdminUpdatePageComponent implements OnInit{

  @Input() id!: string;
  private productUtils : ProductUtilsService = inject(ProductUtilsService)
  protected productService : ProductService = inject(ProductService)
  protected config$: Signal<FormConfig> = computed(() => this.genFormConfigs(this.detail$()));
  public detail$: WritableSignal<Product | null> = signal(null);



  ngOnInit(): void {
    this.productService.detail(this.id).pipe(
      tap((detail : Product) => this.detail$.set(detail))
    ).subscribe()
  }

  genFormConfigs(product:Product| null): FormConfig {
    const detail =  product ?? this.productUtils.getEmpty();
    return this.productUtils.getDataFormConfig(detail);

  }

  onFormSubmitted(formValue: any): void {
    console.log('Form submitted with value:', formValue);
    // Créer un ProductUpdatePayload et l'envoyer au service de product pour le push de l'objet en DB
  }
}
