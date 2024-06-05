import {Component, DestroyRef, EventEmitter, inject, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FieldTypeConfig, FormConfig} from '../../data/config/form.config';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {handleFormChange} from '../../utils';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {FormError} from '../../type';

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
  @Output() cancel = new EventEmitter<void>();
  @Output() public formGroupSet = new EventEmitter<FormGroup>();
  public form!: FormGroup;

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
    this.formGroupSet.emit(this.form);
  }

  private addFormControl(fieldName: any, validators: any[] = []): void {
    this.form.addControl(fieldName, this.formBuilder.control(this.config.data[fieldName], validators));
  }
}
