export interface IStore {

  name:string;
  availableAmount:number;
  investedAmount:number;
  fundsSubscribed:number[];
  transactionsHistory:ITransactionsHistory[];
}

export interface ITransactionsHistory {
  date:string;
  fund:string;
  idFund:number;
  type:TypeTransaction;
  amount:number;
  notification:TypeNotification;
}
export type TypeTransaction = 'Suscripcion' | 'Cancelacion';
export type TypeNotification = 'EMAIL' | 'SMS';
