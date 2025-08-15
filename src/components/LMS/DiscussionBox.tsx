import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface DiscussionBoxProps {
  title?: string;
  messageCount?: number;
  onClick?: () => void;
}

const DiscussionBox = ({ 
  title = "Discussion Box", 
  messageCount = 3, 
  onClick 
}: DiscussionBoxProps) => {
  return (
    <Card className="p-6 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-0 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary-foreground/80 text-sm mb-1">{title}</p>
          <h3 className="text-xl font-bold">{messageCount} New Messages</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClick}
          className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
};

export default DiscussionBox;