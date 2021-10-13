import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api'

interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  type: string;
  createdAt: string;
}

// interface TransactionInput {
//   title: string;
//   category: string;
//   amount: number;
//   type: string;
// }
// OU
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
 
interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => void;
}

export const TransactionContext = createContext<TransactionsContextData>( {} as TransactionsContextData )

export function TransactionProvider({children}: TransactionProviderProps) {
    const [ transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
    api.get('/transactions')
    .then(response => setTransactions(response.data.transactions))
  }, [])

  function createTransaction(transactions: TransactionInput ) {
    api.post('/transactions', transactions)
  }
  
  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}