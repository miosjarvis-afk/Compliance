export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Demo Agency</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid gap-6 md:grid-cols-4">
          {/* Stats Cards */}
          {[
            { label: "Total Projects", value: "12", change: "+2 this month" },
            { label: "Active Passports", value: "8", change: "Ready to share" },
            { label: "Pending Review", value: "3", change: "Needs attention" },
            { label: "Sync Active", value: "5", change: "Connected" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
            >
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Recent Projects</h2>
          <div className="rounded-lg border">
            <div className="p-4 text-center text-muted-foreground">
              <p className="text-sm">
                No projects yet. Start by creating your first Trust Passport.
              </p>
              <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Create Project
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}