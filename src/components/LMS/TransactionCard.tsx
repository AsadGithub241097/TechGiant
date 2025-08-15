import { Card } from "../ui/card";

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: string;
  type: "expense" | "income";
  category?: "uniform" | "transport" | "course";
}

interface TransactionCardProps {
  transaction: Transaction;
}

const iconMap = {
  uniform: "👔",
  transport: "🚗",
  course: "📚",
};

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <Card className="p-4 bg-dashboard-stats-bg border-border shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-lg">
              {iconMap[transaction.category as keyof typeof iconMap] || "💰"}
            </span>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground text-sm">{transaction.title}</h4>
            <p className="text-xs text-dashboard-sidebar-text">{transaction.date}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className={`font-semibold text-sm ${
            transaction.type === "expense" ? "text-red-600" : "text-green-600"
          }`}>
            {transaction.type === "expense" ? "-" : "+"}{transaction.amount}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TransactionCard;