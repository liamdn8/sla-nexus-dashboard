
import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AccountSettingsNavigation } from "@/components/settings/AccountSettingsNavigation";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { SystemLinksSection } from "@/components/settings/SystemLinksSection";
import { NotificationsSection } from "@/components/settings/NotificationsSection";
import { PreferencesSection } from "@/components/settings/PreferencesSection";

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    bio: 'Senior DevOps Engineer with 5+ years of experience.',
    avatar: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
  });

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC',
  });

  const [userSystemLinks, setUserSystemLinks] = useState([
    {
      id: '1',
      name: 'Development Jira',
      type: 'jira',
      baseUrl: 'https://dev.atlassian.net',
      description: 'Development team Jira instance for project management and issue tracking',
      authMethod: 'api_token',
      credentialType: 'user_specific',
      userUsername: 'john.doe@company.com',
      userApiToken: 'ATATT3xFfGF0...',
      userPassword: '',
      credentialStatus: 'configured',
      lastUpdated: '2024-06-01',
    },
    {
      id: '2',
      name: 'Personal Jenkins',
      type: 'jenkins',
      baseUrl: 'https://jenkins.dev.com',
      description: 'Personal Jenkins builds for CI/CD pipelines',
      authMethod: 'username_password',
      credentialType: 'user_specific',
      userUsername: 'john.doe',
      userApiToken: '',
      userPassword: '',
      credentialStatus: 'not_configured',
      lastUpdated: null,
    },
    {
      id: '3',
      name: 'Production Harbor',
      type: 'harbor',
      baseUrl: 'https://harbor.company.com',
      description: 'Container registry for production deployments',
      authMethod: 'api_token',
      credentialType: 'admin_shared',
      userUsername: '',
      userApiToken: '',
      userPassword: '',
      credentialStatus: 'admin_managed',
      lastUpdated: '2024-05-15',
    },
    {
      id: '4',
      name: 'Staging Confluence',
      type: 'confluence',
      baseUrl: 'https://staging.atlassian.net',
      description: 'Documentation and knowledge base for staging environment',
      authMethod: 'api_token',
      credentialType: 'user_specific',
      userUsername: 'john.doe@company.com',
      userApiToken: 'ATATT3xFfGF0...',
      userPassword: '',
      credentialStatus: 'expired',
      lastUpdated: '2024-04-20',
    },
  ]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intersection Observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('#profile, #system-links, #notifications, #preferences');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <div className="flex-1 space-y-6 p-6 pr-72">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
              <p className="text-muted-foreground">
                Manage your account profile, notifications, preferences, and system credentials.
              </p>
            </div>

            <div className="grid gap-6">
              <ProfileSection profile={profile} setProfile={setProfile} />
              <SystemLinksSection userSystemLinks={userSystemLinks} setUserSystemLinks={setUserSystemLinks} />
              <NotificationsSection notifications={notifications} setNotifications={setNotifications} />
              <PreferencesSection preferences={preferences} setPreferences={setPreferences} />
            </div>
          </div>
        </SidebarInset>
        <AccountSettingsNavigation onNavigate={handleNavigate} activeSection={activeSection} />
      </div>
    </SidebarProvider>
  );
};

export default AccountSettings;
