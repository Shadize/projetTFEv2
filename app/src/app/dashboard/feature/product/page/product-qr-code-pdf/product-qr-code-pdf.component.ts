import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {ulid} from 'ulid';
import {QRCodeModule} from 'angularx-qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {forkJoin, from, tap} from 'rxjs';
import {format} from 'date-fns';
import {ProductService} from '../../service';
import {Product} from '../../data';
import {JsonPipe} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

interface ProductPage {
  id: string;
  products: any[];
}

@Component({
  selector: 'app-product-qr-code-pdf',
  standalone: true,
  imports: [
    QRCodeModule,
    JsonPipe,
    TranslateModule
  ],
  templateUrl: './product-qr-code-pdf.component.html',
  styleUrl: './product-qr-code-pdf.component.scss'
})
export class ProductQrCodePdfComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  protected pages: Signal<ProductPage[]> = computed(() => this.getList(this.productService.list$()));
  products: ProductPage[] = [
    {id: ulid(), products: new Array(30).fill(ulid())},
    {id: ulid(), products: new Array(30).fill(ulid())},
    {id: ulid(), products: new Array(30).fill(ulid())},
    {id: ulid(), products: new Array(30).fill(ulid())}];

  ngOnInit() {
    this.productService.list();
  }

  protected getList(list: Product[] | undefined): ProductPage[] {
    if (list) {
      console.log('ici', Math.floor(list.length / 30));
      let nbPage: number = Math.floor(list.length / 30);
      nbPage = nbPage > 0 ? nbPage : 1;

      console.log(new Array(nbPage).map(() => {
        return ulid();
      }));
      const pages:ProductPage[] = [];
      for (let i = 0; i < nbPage; i++) {
        const maxItem = (i + 1) * 30;
        const products = list.slice(i * 30, maxItem > list.length ? list.length : maxItem);
        pages.push({
          id: ulid(), products
        })
      }
      return pages;
    }
    this.productService.list();
    return [];
  }

  protected getPdf(): void {
    let pdf = new jsPDF('p', 'mm', 'a4');
    forkJoin(this.pages()
      .map(
        (page: ProductPage) =>
          from(html2canvas(document.getElementById(page.id)!))
      )).pipe(
      tap((data) => {
        for (let i = 0; i < data.length; i++) {
          var imgWidth = 208;
          var pageHeight = 295;
          var imgHeight = data[i].height * imgWidth / data[i].width;
          var heightLeft = imgHeight;
          const contentDataURL = data[i].toDataURL('image/png');
          var position = 0;
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          if (i + 1 < data.length) {
            pdf.addPage();
          }
        }
      })
    ).subscribe(() => {
      pdf.save(`${format(new Date(), 'dd-MM-yyyy')}_product_list.pdf`)
    });
  }

}
