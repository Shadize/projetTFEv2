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
  @Output() public dataChange = new EventEmitter<any>();
  public form!: FormGroup;
  private destroyRef: DestroyRef = inject(DestroyRef);

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
    this.form.valueChanges
      .pipe(
        // that's mean kill this observer when component is destroyed
        takeUntilDestroyed(this.destroyRef),
        // send signal with new errors
        tap((errors: FormError[]) => this.dataChange.emit(this.form)))
      .subscribe();
  }

  private addFormControl(fieldName: any, validators: any[] = []): void {
    this.form.addControl(fieldName, this.formBuilder.control(this.config.data[fieldName], validators));
  }
}
