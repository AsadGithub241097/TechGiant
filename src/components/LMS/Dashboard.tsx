import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MyCourses from "./MyCourses";
import UpcomingTasks from "./UpcomingTasks";
import YourTransactions from "./YourTransactions";
import { Clock, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();

  const handleSidebarItemClick = (itemId: string) => {
    setActiveItem(itemId);
    console.log(`Navigating to: ${itemId}`);
    
    // Navigate to courses page when course is clicked
    if (itemId === "course") {
      navigate("/courses");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem={activeItem} onItemClick={handleSidebarItemClick} />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div style={{ background: 'white', padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#1e293b', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            Hi Tarun, Welcome to Tech Giant LMS
          </h1>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Stats and Discussion Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Learning Time Card */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
                <div>
                  <h3 style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Learning Time</h3>
                  <p style={{ color: '#1e293b', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>2h 37m</p>
                </div>
              </div>
            </div>
            
            {/* My Activities Card */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TrendingUp style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
                <div>
                  <h3 style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>My Activities</h3>
                  <p style={{ color: '#1e293b', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>21 Tasks</p>
                </div>
              </div>
            </div>
            
            {/* Discussion Box */}
            <div style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
              padding: '20px', 
              borderRadius: '12px', 
              color: 'white',
              cursor: 'pointer'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Discussion Box</h3>
              <p style={{ fontSize: '14px', margin: '0 0 16px 0', opacity: 0.9 }}>3 New Messages</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>View All</span>
                <span style={{ fontSize: '16px' }}>→</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-6">
              {/* Course Feature */}
              <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b' }}>
                  Learn Python within 30 Days
                </h2>
                <p style={{ color: '#64748b', marginBottom: '20px' }}>
                  Master Python programming from basics to advanced concepts in just 30 days with hands-on projects and real-world applications.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ 
                    background: '#3b82f6', 
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '6px', 
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Join Course
                  </button>
                  <button style={{ 
                    background: 'transparent', 
                    color: '#64748b', 
                    padding: '8px 16px', 
                    borderRadius: '6px', 
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer'
                  }}>
                    Skip
                  </button>
                </div>
              </div>
              
              {/* My Courses Component */}
              <MyCourses />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <UpcomingTasks />
              <YourTransactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;