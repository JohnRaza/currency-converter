import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConversionRecord } from '../../models/conversion-record.model';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  conversionForm: FormGroup = new FormGroup({
    fromCurrency: new FormControl('USD', Validators.required),
    toCurrency: new FormControl('EUR', Validators.required),
    amount: new FormControl(1, [Validators.required, Validators.min(0)]),
  });
  currencies: {code: string, name: string}[] = [];
  conversionResult: string | null = null;
  conversionHistory: ConversionRecord[] = [];
  loading: boolean = false;

  constructor(private currencyService: CurrencyService) {
    this.currencies = currencyService.currencyList;
  }

  ngOnInit(): void {
    const storedHistory = localStorage.getItem('conversionHistory');
    if (storedHistory) {
      this.conversionHistory = JSON.parse(storedHistory).map(
        (record: any) =>
          new ConversionRecord(
            record.from,
            record.to,
            record.amount,
            record.convertedAmount
          )
      );
    }
  }

  convert() {
    if (this.conversionForm.invalid) {
      return;
    }

    this.loading = true;
    const { fromCurrency, toCurrency, amount } = this.conversionForm.value;
    this.currencyService
      .convertCurrency(fromCurrency, toCurrency, amount)
      .subscribe(
        (result) => {
          this.conversionResult = `${amount} ${fromCurrency} = ${result.convertedAmount.toFixed(2)} ${toCurrency}`;
          if(result.convertedAmount){
            this.addToHistory(fromCurrency, toCurrency, amount, result.convertedAmount.toFixed(2));
          }
          this.loading = false;
        },
        (error) => {
          console.error('Conversion error:', error);
          this.loading = false;
        }
      );
  }

  addToHistory(
    from: string,
    to: string,
    amount: number,
    convertedAmount: string
  ) {
    const record = new ConversionRecord(from, to, amount, convertedAmount);
    this.conversionHistory.push(record);
    localStorage.setItem(
      'conversionHistory',
      JSON.stringify(this.conversionHistory)
    );
  }
}
