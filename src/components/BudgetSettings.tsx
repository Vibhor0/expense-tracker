import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

interface BudgetSettingsProps {
  onBudgetSet: (limit: number) => void;
  currentLimit: number;
}

export default function BudgetSettings({ onBudgetSet, currentLimit }: BudgetSettingsProps) {
  const [monthlyLimit, setMonthlyLimit] = useState(currentLimit.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBudgetSet(parseFloat(monthlyLimit));
    toast.success('Budget limit updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Budget Limit
        </label>
        <div className="relative">
          <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="number"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Set your monthly limit"
            step="0.01"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Update Budget Limit
      </button>
    </form>
  );
}