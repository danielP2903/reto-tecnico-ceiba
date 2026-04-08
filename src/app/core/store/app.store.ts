import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { IStore, TypeNotification, TypeTransaction } from "../models/store";
import { IFund } from "../models/fund";

export const initialState: IStore = {
  name: 'Leo Messi',
  availableAmount: 500000,
  investedAmount: 0,
  fundsSubscribed: [],
  transactionsHistory:[]
}

/**Se usa la libreria ngrx/signals para mantener el estado reactivo dentro de la aplicación */
export const AppState = signalStore(
  { providedIn: 'root', protectedState: true },
  withState(initialState),
  withMethods((store) => ({
    investAmount: (amount: number) => {
      patchState(store, (state) => {
        if (amount > state.availableAmount) return state;

        return {
          ...state,
          availableAmount: state.availableAmount - amount,
          investedAmount: state.investedAmount + amount
        };
      });
    },

    subscribeFund: (id: number) => {
      patchState(store, (state) => {
        if (state.fundsSubscribed.includes(id)) return state;

        return {
          ...state,
          fundsSubscribed: [...state.fundsSubscribed, id]
        };
      });
    },
    unsuscribeFund: (id: number) => {
      patchState(store, (state) => {
        if (!state.fundsSubscribed.includes(id)) return state;

        return {
          ...state,
          fundsSubscribed: state.fundsSubscribed.filter((f) => f !== id)
        }
      })
    },
    recoverInvestment: (amount: number) => {
      patchState(store, (state) => {
        return {
          ...state,
          availableAmount: state.availableAmount + amount,
          investedAmount: state.investedAmount - amount
        };
      });
    },
    addTransactionHistory: (fund: IFund,typeFund:TypeTransaction,typeNotification:TypeNotification) => {
      const newTransaction = {
        date: new Date().toLocaleDateString(),
        fund: fund.name,
        idFund: fund.id,
        type: typeFund,
        amount: fund.minimumAmount,
        notification: typeNotification
      }
      patchState(store, (state) => {
        return {
          ...state,
          transactionsHistory: [...state.transactionsHistory, newTransaction]
        }
      });
    }
  }))
);
