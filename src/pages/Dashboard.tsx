import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IndividualDashboard from "./IndividualDashboard";
import PartnerDashboard from "./PartnerDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user type from localStorage (will be from database later)
    const storedUserType = localStorage.getItem('userType');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (!storedUserType) {
      navigate('/landing');
      return;
    }
    
    setUserType(storedUserType);
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