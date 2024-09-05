export class ConversionRecord {
  date: string;
  from: string;
  to: string;
  amount: number;
  convertedAmount: string;

  constructor(
    from: string,
    to: string,
    amount: number,
    convertedAmount: string
  ) {
    this.date = new Date().toLocaleString();
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.convertedAmount = convertedAmount;
  }
}
