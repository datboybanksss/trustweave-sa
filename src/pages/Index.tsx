import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and determine dashboard type
    const userType = localStorage.getItem('userType');
    
    if (userType) {
      // User is logged in, redirect to dashboard
      navigate('/dashboard');
    } else {
      // User is not logged in, redirect to landing page
      navigate('/landing');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );
};

export default Index;