import { Component } from '@angular/core';
import {BarcodeService} from "../../service/barcode.service";
import {Barcode} from "../../model/barcode.declaration";

@Component({
  selector: 'app-barcode-list',
  templateUrl: './barcode-list.component.html',
  styleUrls: ['./barcode-list.component.scss'],
})
export class BarcodeListComponent {

  constructor(public barcodeService: BarcodeService) { }

  handleDelete(bc: Barcode) {
    this.barcodeService.delete(bc);
  }

  handleFetchInfo(bc: Barcode){
    this.barcodeService.fetchInfo(bc);
  }

}
