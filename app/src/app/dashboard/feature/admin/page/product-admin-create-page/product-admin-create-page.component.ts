import { Product } from '../../../product/data/business/product.business';
import {Component, OnInit, Signal, computed, inject, signal, WritableSignal} from '@angular/core';
import { FormBuilderComponent } from "../../../../../shared/ui/form/component/form-builder/form-builder.component";
import { FormConfig } from 'app/shared/ui/form/data/config/form.config';
import { ProductKey } from '@product-feature';
import { Validators } from '@angular/forms';
import { ProductUtilsService } from 'app/dashboard/feature/product/service';

@Component({
    selector: 'app-product-create-page',
    standalone: true,
    templateUrl: './product-admin-create-page.component.html',
    styleUrl: './product-admin-create-page.component.scss',
    imports: [FormBuilderComponent]
})
export class ProductAdminCreatePageComponent {
  private productUtils : ProductUtilsService = inject(ProductUtilsService)
  protected config$: WritableSignal<FormConfig> = signal( this.genFormConfigs());

  genFormConfigs(): FormConfig {

    let product : Product = this.productUtils.getEmpty();

    return this.productUtils.getDataFormConfig(product,[]);

  }

  onFormSubmitted(formValue: any): void {
    console.log('Form submitted with value:', formValue);
    // Créer un ProductCreatePayload et l'envoyer au service de product pour le push de l'objet en DB
  }
}
