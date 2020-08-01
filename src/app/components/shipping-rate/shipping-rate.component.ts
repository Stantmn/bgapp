import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ShippingRate } from '../../classes/shipping-rate';
import * as XLSX from 'xlsx';
import { ModalComponent } from '../../shared/modules/modal/modal.component';
import { RateService } from '../../services/rate.service';
import { Countries } from '../../constants/constants';

@Component({
  selector: 'app-shipping-rate',
  templateUrl: './shipping-rate.component.html',
  styleUrls: ['./shipping-rate.component.scss'],
  providers: [RateService]
})
export class ShippingRateComponent implements OnInit {
  @Input() rates: ShippingRate[];
  @Input() storeId: string;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  private xlsData: any = {};
  ratesForXLS = {};
  ratesFromXLS: ShippingRate[] = [];

  constructor(
    private rateService: RateService,
    private modal: ModalComponent
  ) { }

  ngOnInit() {
    this.getRates();
  }

  getRates(): void {
    this.rateService.getRates(this.storeId)
      .subscribe(
        rates => {
          this.rates = rates;
        },
        error => {
          this.modal.openMessage('Server Error', error.error ? error.error.error : 'Can\'t get a list of rates', 0);
          console.log(error);
        }
      );
  }

  onFileChanged(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.xlsData = <any>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.checkXLSData();
      this.fileInput.nativeElement.value = '';
    };
    reader.readAsBinaryString(target.files[0]);
  }


  exportRatesToXLS(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.convertRatesToXLS());
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, 'rates.xlsx');
    this.ratesForXLS = {};
  }

  convertRatesToXLS(): any {
    return this.ratesForXLS = this.rates.map(shippingRate => {
      const xlsRow = {};
      xlsRow['Country'] = shippingRate.countryCode;
      for (let i = 0; i < 60; i++) {
        xlsRow[(i + 1) + ' lb'] = shippingRate.rates[i] ? shippingRate.rates[i].cost : '';
      }
      return xlsRow;
    });
  }

  checkXLSData(): void {
    const error = [];
    let errorText = '';
    for (let i = 1; i < this.xlsData.length; i++) {
      const row = this.xlsData[i];
      const shippingRate = new ShippingRate();
      if (row[0] && Countries[row[0]]) {
        shippingRate.countryCode = row[0];
      } else {
        errorText += 'Country code not found:  ' + row[0] + '. ';
      }
      for (let j = 1; j < 61; j++) {
        shippingRate.rates.push({weight: j, cost: row[j] || null});
      }
      if (errorText) {
        error.push(errorText);
        errorText = '';
      }
      this.ratesFromXLS.push(shippingRate);
    }

    if (error.length) {
      console.log(error);
      this.modal.openMessage('XLS Error', error.join('<br>'), 0);
      this.xlsData = {};
      this.ratesFromXLS = [];
    } else {
      this.saveFromXLS();
    }
  }

  saveFromXLS(): void {
    this.modal.openMessage('Import all rates?', 'Import means you will reload all rates.', 1)
      .then(result => {
        if (result) {
          this.rateService.loadRates(this.ratesFromXLS, this.storeId)
            .subscribe(
              response => {
                this.modal.openMessage('Success', 'Rates were saved. ' + response, 0);
              },
              error => {
                this.modal.openMessage('Server Error', error.message ? error.error : 'Can\'t save the rates information', 0);
                console.log(error);
              },
              () => {
                this.xlsData = {};
                this.ratesFromXLS = [];
                this.getRates();
              }
            );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

}
