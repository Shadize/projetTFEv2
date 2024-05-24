import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormConfig, FormValidatorsConfig } from '../../data/config/form.config';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent implements OnInit{
  @Input({ required: true }) config!: FormConfig;
  @Output() formSubmitted = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({});

    // Loop over the fields from the config and use addFormControl method
    this.config.fields.forEach(field => {
      const fieldConfig = this.config.validators.find(v => v.field === field);
      const validators = fieldConfig ? fieldConfig.validators : [];
      this.addFormControl(field, validators);
    });
  }

  private addFormControl(fieldName: string, validators : any[] = []){
    this.form.addControl(fieldName, this.formBuilder.control('', validators));
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }
}
