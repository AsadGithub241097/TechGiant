import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface HeaderProps {
  userName?: string;
  welcomeText?: string;
}

const Header = ({ userName = "Tarun", welcomeText = "Welcome to Soval" }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 bg-background">
      <div>
        <p className="text-dashboard-sidebar-text text-sm">Hi {userName},</p>
        <h1 className="text-2xl font-bold text-foreground">{welcomeText}</h1>
      </div>
      
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dashboard-sidebar-text w-4 h-4" />
        <Input
          placeholder="Search"
          className="pl-10 bg-background border-border focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default Header;