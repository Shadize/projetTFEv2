import { Product } from './../../../product/data/business/product.business';
import { Component, OnInit, Signal, computed } from '@angular/core';
import { FormBuilderComponent } from "../../../../../shared/ui/form/component/form-builder/form-builder.component";
import { FormConfig } from 'app/shared/ui/form/data/config/form.config';
import { ProductKey } from '@product-feature';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-product-create-page',
    standalone: true,
    templateUrl: './product-create-page.component.html',
    styleUrl: './product-create-page.component.scss',
    imports: [FormBuilderComponent]
})
export class ProductCreatePageComponent {
  protected config$: Signal<FormConfig> = computed(() => this.genFormConfigs());

  genFormConfigs(): FormConfig {
    const fields = Object.values(ProductKey);
    const validators = fields.map(field => ({
      field,
      validators: [Validators.required]
    }));

    const config: FormConfig = {
      fields,
      validators
    };

    console.log(config);
    return config;
  }

  onFormSubmitted(formValue: any): void {
    console.log('Form submitted with value:', formValue);
    // handle form submission logic here
  }
}
