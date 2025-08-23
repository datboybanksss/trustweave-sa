import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IndividualDashboard from "./IndividualDashboard";
import PartnerDashboard from "./PartnerDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    // Check if user is logged in
    if (!userType) {
      navigate('/landing');
      return;
    }
  }, [userType, navigate]);

  // Show appropriate dashboard based on user type
  if (userType === 'partner' || userType === 'lawyer') {
    return <PartnerDashboard />;
  }

  return <IndividualDashboard />;
};

export default Dashboard;