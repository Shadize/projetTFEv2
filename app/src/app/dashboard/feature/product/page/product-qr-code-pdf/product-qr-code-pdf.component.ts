import {Component} from '@angular/core';
import {ulid} from 'ulid';

@Component({
  selector: 'app-product-qr-code-pdf',
  standalone: true,
  imports: [],
  templateUrl: './product-qr-code-pdf.component.html',
  styleUrl: './product-qr-code-pdf.component.scss'
})
export class ProductQrCodePdfComponent {
  products = new Array(100).fill(ulid());


}
