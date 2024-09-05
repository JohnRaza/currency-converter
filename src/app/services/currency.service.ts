import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../api-constants/api-constant';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currencyList = [
    { code: 'EUR', name: 'Euro' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'BGN', name: 'Bulgarian Lev' },
    { code: 'CZK', name: 'Czech Republic Koruna' },
    { code: 'DKK', name: 'Danish Krone' },
    { code: 'GBP', name: 'British Pound Sterling' },
    { code: 'HUF', name: 'Hungarian Forint' },
    { code: 'PLN', name: 'Polish Zloty' },
    { code: 'RON', name: 'Romanian Leu' },
    { code: 'SEK', name: 'Swedish Krona' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'ISK', name: 'Icelandic Króna' },
    { code: 'NOK', name: 'Norwegian Krone' },
    { code: 'HRK', name: 'Croatian Kuna' },
    { code: 'RUB', name: 'Russian Ruble' },
    { code: 'TRY', name: 'Turkish Lira' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'BRL', name: 'Brazilian Real' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
    { code: 'IDR', name: 'Indonesian Rupiah' },
    { code: 'ILS', name: 'Israeli New Sheqel' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'KRW', name: 'South Korean Won' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'MYR', name: 'Malaysian Ringgit' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'PHP', name: 'Philippine Peso' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'ZAR', name: 'South African Rand' },
  ];

  constructor(private apiConstants: ApiConstants, private http: HttpClient) {}

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    return this.http.get<any>(
      `${
        environment.baseUrl + this.apiConstants.CONVERT
      }?from=${from}&to=${to}&amount=${amount}`
    );
  }
}
