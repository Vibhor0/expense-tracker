import React from 'react';
import { format } from 'date-fns';

interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  remainingBudget: number;
  dailyBudget: number;
  remainingDays: number;
}

export default function ExpenseList({
  expenses,
  remainingBudget,
  dailyBudget,
  remainingDays,
}: ExpenseListProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Budget Overview</h3>
        <div
          className={`text-2xl font-bold ${
            remainingBudget >= 0 ? 'text-blue-600' : 'text-red-600'
          }`}
        >
          ${Math.abs(remainingBudget).toFixed(2)}{' '}
          {remainingBudget >= 0 ? 'remaining' : 'over budget'}
        </div>
        {remainingBudget > 0 && remainingDays > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            ${dailyBudget.toFixed(2)} per day for the rest of the month ({remainingDays}{" "}
            {remainingDays === 1 ? 'day' : 'days'} left)
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Expenses</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {expenses.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No expenses recorded yet
            </div>
          ) : (
            expenses
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((expense) => (
                <div key={expense.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(expense.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="text-lg font-semibold text-red-600">
                      -${expense.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
