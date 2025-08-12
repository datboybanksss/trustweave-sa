import Navigation from "@/components/shared/Navigation";

const Dashboard = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="container mx-auto px-4 py-12">
    <h1 className="font-display text-3xl mb-4">Your Dashboard</h1>
    <p className="text-muted-foreground">Quick stats, appointments, and recommendations coming soon.</p>
    </main>
  </div>
);
export default Dashboard;
