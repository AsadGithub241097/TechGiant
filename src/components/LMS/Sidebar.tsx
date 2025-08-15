import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Calendar, 
  User, 
  Settings, 
  LogOut 
} from "lucide-react";
import { cn } from "../../lib/util";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
}

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

const sidebarItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
  { id: "course", label: "Course", icon: BookOpen },
  { id: "resources", label: "Resources", icon: FileText },
  { id: "discussion", label: "Discussion", icon: MessageSquare },
  { id: "schedules", label: "Schedules", icon: Calendar },
  { id: "account", label: "my Account", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ activeItem = "dashboard", onItemClick }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-dashboard-sidebar-bg border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">Student</h1>
            <p className="text-xs text-dashboard-sidebar-text uppercase tracking-wide">DASHBOARD</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick?.(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left",
                    isActive
                      ? "bg-dashboard-sidebar-active-bg text-dashboard-sidebar-active font-medium"
                      : "text-dashboard-sidebar-text hover:bg-dashboard-sidebar-active-bg/50 hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-dashboard-sidebar-text hover:bg-dashboard-sidebar-active-bg/50 hover:text-foreground transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;