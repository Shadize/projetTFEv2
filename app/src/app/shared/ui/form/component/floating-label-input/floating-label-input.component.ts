import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-floating-label-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './floating-label-input.component.html',
    styleUrls: ['./floating-label-input.component.scss']
})
export class FloatingLabelInputComponent {
    @Input({required: true}) label!: string;
    @Input({required: true}) control!: FormControl<any>;
    @Input() type: string = 'text';
    inputFocus: boolean = false;
}
