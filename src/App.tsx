import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BudgetSettings from './components/BudgetSettings';
import { Wallet } from 'lucide-react';

interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthlyLimit, setMonthlyLimit] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);
  const [dailyBudget, setDailyBudget] = useState(0);

  useEffect(() => {
    // Load data from localStorage
    const savedExpenses = localStorage.getItem('expenses');
    const savedLimit = localStorage.getItem('monthlyLimit');
    
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    if (savedLimit) {
      setMonthlyLimit(parseFloat(savedLimit));
    }
  }, []);

  useEffect(() => {
    // Calculate remaining budget and remaining days in the current month
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const remainingDaysInMonth = daysInMonth - currentDate.getDate();

    setRemainingDays(remainingDaysInMonth);
    setRemainingBudget(monthlyLimit - totalExpenses);
    setDailyBudget(remainingDaysInMonth > 0 ? remainingBudget / remainingDaysInMonth : 0);
  }, [expenses, monthlyLimit]);

  const handleExpenseAdded = (newExpense: Expense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const handleBudgetSet = (limit: number) => {
    setMonthlyLimit(limit);
    localStorage.setItem('monthlyLimit', limit.toString());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Budget Settings</h2>
              <BudgetSettings
                onBudgetSet={handleBudgetSet}
                currentLimit={monthlyLimit}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>
              <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            </div>
          </div>

          <div>
            <ExpenseList
              expenses={expenses}
              remainingBudget={remainingBudget}
              dailyBudget={dailyBudget}
              remainingDays={remainingDays}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
