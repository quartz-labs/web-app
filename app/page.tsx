"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import Nav from "@/components/Nav/Nav";
import Onboarding from "@/components/Onboarding/Onboarding";

export default function Page() {
  const freshAccount = true;
  
  return (
    <main>
      <Nav />

      {freshAccount && 
        <Onboarding />
      }

      {!freshAccount && 
        <Dashboard />
      }
    </main>
  );
}
