import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'DeployDock · Workspace', description: 'Your services, deployments and incidents in one workspace.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
