export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground transition-colors duration-300">
      
      {/* Navigation */}
      <header className="sticky top-0 z-sticky w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl shadow-sm">
              B
            </div>
            <span className="text-xl font-bold tracking-tight">Blintzy</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Features</a>
            <a href="#" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted text-muted-foreground hover:text-foreground">
              Log in
            </button>
            <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center py-12 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            🎉 The New Way to Print on Campus
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Campus Printing. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff9900]">Delivered Smarter.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Upload your documents, choose your options, and pick up your prints without waiting in line. The fastest, easiest way for students to handle their printing needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="/app/login" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow-premium transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Start Printing
            </a>
            <a href="/features" className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-base font-medium shadow-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              How it Works
            </a>
          </div>
        </div>

        {/* Feature Cards Showcase */}
        <div className="mt-12 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {[
            { 
              title: "Skip the Line", 
              desc: "Order from your phone and your prints are ready when you arrive.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            },
            { 
              title: "Crystal Clear Quality", 
              desc: "Professional grade printing for assignments, presentations, and more.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            },
            { 
              title: "Student Friendly", 
              desc: "Affordable pricing tailored specifically for student budgets.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-start text-left p-6 rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50 group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="border-t border-border py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Blintzy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
