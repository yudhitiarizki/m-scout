import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { CustomerDetail } from './components/CustomerDetail';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'user';
};

export type LoanType = 'KUR' | 'KUM' | 'KSM' | 'Konsumtif' | 'Multiguna';

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  nik: string;
  address: string;
  occupation: string;
  monthlyIncome: number;
  hasLoan: boolean;
  loanHistory: LoanHistory[];
  savings: number;
  livinTransactions: Transaction[];
  livinMerchantTransactions: Transaction[];
  documents: Document[];
  visitDocumentation: Visit[];
  activeLoan?: ActiveLoan;
  assignedTo?: string;
};

export type LoanHistory = {
  id: string;
  amount: number;
  date: string;
  status: 'paid' | 'active' | 'overdue';
  type: LoanType;
};

export type Transaction = {
  date: string;
  amount: number;
  description: string;
};

export type Document = {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  url: string;
};

export type Visit = {
  id: string;
  date: string;
  purpose: string;
  notes: string;
  visitedBy: string;
  location: {
    address: string;
    coordinates: string;
  };
  photos: string[];
};

export type ActiveLoan = {
  id: string;
  amount: number;
  type: LoanType;
  interestRate: number;
  monthlyPayment: number;
  startDate: string;
  dueDate: string;
  tenor: number;
  paidPrincipal: number;
  paidInterest: number;
  remainingPrincipal: number;
  paymentHistory: PaymentHistory[];
  nextPaymentDate: string;
};

export type PaymentHistory = {
  date: string;
  principal: number;
  interest: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
};

export type PromoSetting = {
  threshold1: number;
  discount1: number;
  threshold2: number;
  discount2: number;
  threshold3: number;
  discount3: number;
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  if (selectedCustomer) {
    return (
      <CustomerDetail 
        customer={selectedCustomer}
        currentUser={currentUser}
        onBack={() => setSelectedCustomer(null)} 
      />
    );
  }

  return (
    <Dashboard 
      currentUser={currentUser}
      onSelectCustomer={setSelectedCustomer}
      onLogout={() => setCurrentUser(null)}
    />
  );
}
