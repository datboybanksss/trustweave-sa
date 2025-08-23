import Navigation from "@/components/shared/Navigation";
import GreetingHero from "@/components/dashboard/GreetingHero";
import QuickStats from "@/components/dashboard/QuickStats";
import WealthGrowthChart from "@/components/dashboard/WealthGrowthChart";
import AssetAllocationChart from "@/components/dashboard/AssetAllocationChart";
import ActionItems from "@/components/dashboard/ActionItems";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

const Dashboard = () => (
  <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
    <Navigation />
    <main className="container mx-auto px-4 py-10 space-y-8">
      <GreetingHero />
      <QuickStats />
      <div className="grid gap-4 lg:grid-cols-2">
        <WealthGrowthChart />
        <AssetAllocationChart />
      </div>
      <ActionItems 
        onCreateTrust={() => {}}
        onUploadDocument={() => {}}
        onBookConsultation={() => window.location.href = '/consultation'}
        onStartLearning={() => window.location.href = '/education'}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <ActivityFeed />
        <UpcomingEvents />
      </div>
    </main>
  </div>
);
export default Dashboard;
