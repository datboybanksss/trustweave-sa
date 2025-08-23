import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IndividualDashboard from "./IndividualDashboard";
import PartnerDashboard from "./PartnerDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user type from localStorage (set during signup)
    const storedUserType = localStorage.getItem('userType');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    console.log('Dashboard - User Type:', storedUserType); // Debug log
    console.log('Dashboard - User Data:', userData); // Debug log
    
    // If no userType found, don't redirect to landing - might be partner/individual
    if (!storedUserType) {
      // Default to individual if no type specified
      setUserType('individual');
    } else {
      setUserType(storedUserType);
    }
    
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user type
  if (userType === 'partner' || userType === 'lawyer' || userType === 'fiduciary') {
    return <PartnerDashboard />;
  }

  // Default to individual dashboard
  return <IndividualDashboard />;
};

export default Dashboard;