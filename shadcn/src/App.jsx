import React from "react";

import { Button, buttonVariants } from "./components/ui/button";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

import { AppSidebar } from "./components/ui/app-sidebar";
const App = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
    </SidebarProvider>
  );
};

export default App;
