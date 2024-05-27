import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FieldTypeConfig, FormConfig} from '../../data/config/form.config';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent implements OnChanges {
  @Input({required: true}) config!: FormConfig;
  @Output() formSubmitted = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnChanges(): void {
    this.form = this.formBuilder.group({});
    this.initializeForm();
  }

  private initializeForm(): void {
    this.config.fields.forEach(field => {
      const fieldConfig = this.config.validators.find(v => v.field === field);
      const validators = fieldConfig ? fieldConfig.validators : [];
      this.addFormControl(field, validators);
    });
  }

  private addFormControl(fieldName: any, validators: any[] = []): void {
    this.form.addControl(fieldName, this.formBuilder.control(this.config.data[fieldName], validators));
  }

  getFieldConfig(fieldName: string): FieldTypeConfig | undefined {
    return this.config.fieldTypes?.find(ft => ft.field === fieldName);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('onsubmit valid', this.form.value);
      this.formSubmitted.emit(this.form.value);
    }
  }
}
