import {AfterViewInit, Component, ElementRef, signal, ViewChild, WritableSignal} from '@angular/core';
import {ulid} from 'ulid';
import {QRCodeModule} from 'angularx-qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {forkJoin, from, tap} from 'rxjs';

interface ProductPage {
  id: string;
  products: any[];
}

@Component({
  selector: 'app-product-qr-code-pdf',
  standalone: true,
  imports: [
    QRCodeModule
  ],
  templateUrl: './product-qr-code-pdf.component.html',
  styleUrl: './product-qr-code-pdf.component.scss'
})
export class ProductQrCodePdfComponent  {
  products: ProductPage[] = [
    {id: ulid(), products: new Array(30).fill(ulid())},
    {id: ulid(), products: new Array(30).fill(ulid())},
    {id: ulid(), products: new Array(30).fill(ulid())},
    {id: ulid(), products: new Array(30).fill(ulid())}];

  protected getPdf(): void {
    let pdf = new jsPDF('p', 'mm', 'a4');
    forkJoin(this.products
      .map(
        (page: ProductPage) =>
          from(html2canvas(document.getElementById(page.id)!))
      )).pipe(
      tap((data) => {
        for (let i=0; i< data.length; i++) {
          var imgWidth = 208;
          var pageHeight = 295;
          var imgHeight = data[i].height * imgWidth / data[i].width;
          var heightLeft = imgHeight;
          const contentDataURL = data[i].toDataURL('image/png');
          var position = 0;
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          if(i+1<data.length){
            pdf.addPage();
          }
        }
      })
    ).subscribe(() => {
      pdf.save('test.pdf')
    });
  }

}
