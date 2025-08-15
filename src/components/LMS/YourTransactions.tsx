import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import TransactionCard from "./TransactionCard";

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: string;
  type: "expense" | "income";
  category?: "uniform" | "transport" | "course";
}

interface YourTransactionsProps {
  transactions?: Transaction[];
  onViewAll?: () => void;
}

const defaultTransactions: Transaction[] = [
  { id: "1", title: "Uniform", date: "Today, 16:36", amount: "₹154.50", type: "expense", category: "uniform" },
  { id: "2", title: "Transport", date: "24 Jun, 15:06", amount: "₹40.50", type: "expense", category: "transport" },
  { id: "3", title: "Design Course", date: "21 Jun, 19:04", amount: "₹70.00", type: "expense", category: "course" },
];

const YourTransactions = ({ 
  transactions = defaultTransactions, 
  onViewAll 
}: YourTransactionsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Your Transactions</h3>
        <p className="text-sm text-dashboard-sidebar-text">Recent</p>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard 
            key={transaction.id} 
            transaction={transaction}
          />
        ))}
      </div>
      
      <Button 
        variant="ghost" 
        onClick={onViewAll}
        className="w-full text-primary hover:text-primary/80 hover:bg-primary/5 justify-center gap-2"
      >
        View all
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default YourTransactions;