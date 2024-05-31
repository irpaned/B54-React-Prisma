// state management

// import React from "react";
// import { createContext, useState } from "react"

// // 1
// interface Transaction {
//     id: number,
//     name: string,
//     price: number,
//     qty: number
// }

// // 2
// type TransactionContextType = {
//     transactions: Transaction[];
//     AddNewTransaction: (transaction: Transaction) => void;
// };

// // 3
// export const TransactionContext = createContext<TransactionContextType | null>(null);

// // 4
// export const TransactionProvider = ({
//     children
// } : {
//     children: React.ReactNode;
// }) => {

//     const [transactions, setTransactions] = useState<Transaction[]>([]);

//     const AddNewTransaction = (newTransaction: Transaction) => {
//         setTransactions((prev) => [...prev, newTransaction]);
//     };

//     return (

//         <TransactionContext.Provider value={{ transactions, AddNewTransaction }}>
//             {children}
//         </TransactionContext.Provider>
//     ) 
// }