'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Activity, ArrowDownToLine, ArrowRight, Box, ChevronRight, CircleHelp, Folder, GitBranch, LayoutDashboard, Menu, Moon, Plus, Radio, Settings, ShieldCheck, Sun, X } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';

export const sections = [
  { id: 'overview', title: 'Overview', icon: LayoutDashboard },
  { id: 'projects', title: 'Projects', icon: Folder },
  { id: 'deployments', title: 'Deployments', icon: GitBranch },
  { id: 'incidents', title: 'Incidents', icon: Activity },
  { id: 'settings', title: 'Settings', icon: Settings },
];
const steps = [
  { number: '01', title: 'Secure your workspace', text: 'Set up your owner account and two-factor authentication.', stage: 'Steps 5–6', icon: ShieldCheck },
  { number: '02', title: 'Add your first project', text: 'Give your service a home, then add an environment.', stage: 'Step 7', icon: Folder },
  { number: '03', title: 'Start watching an endpoint', text: 'Run a safe endpoint test and schedule your first check.', stage: 'Steps 8–9', icon: Radio },
];

export function Workspace({ section = 'overview' }: { section?: string }) {
  const [light, setLight] = useState(false);
  const [notice, setNotice] = useState('');
  const drawer = useRef<HTMLDialogElement>(null);
  const heading = sections.find(s => s.id === section)?.title ?? 'Overview';
  function explain(message: string) { setNotice(message); }
  function navigation() {
    return <><Link href="/" className="brand" aria-label="DeployDock home"><span className="brand-mark"><Box size={21} /></span>DeployDock<span className="version">LOCAL</span></Link>
      <div className="workspace-label"><span className="workspace-avatar">N</span><div>Nico’s workspace<small>Personal workspace</small></div></div>
      <div className="nav-caption">WORKSPACE</div><nav aria-label="Main navigation">{sections.map(({ id, title, icon: Icon }) => <Link key={id} onClick={() => drawer.current?.close()} href={id === 'overview' ? '/' : `/${id}`} aria-current={section === id ? 'page' : undefined}><Icon size={18} /><span>{title}</span>{id === 'projects' && <span className="nav-count">0</span>}</Link>)}</nav>
      <div className="sidebar-bottom"><div className="local-context"><span className="neutral-dot" /> Local development<small>Workspace foundation · v0.1</small></div><div className="profile"><span className="profile-avatar">N</span><div>Nico<small>Account setup pending</small></div><CircleHelp size={17} aria-hidden="true" /></div></div></>;
  }
  return <div className="app" data-theme={light ? 'light' : 'dark'}>
    <a className="skip-link" href="#main">Skip to content</a>
    <aside className="sidebar">{navigation()}</aside>
    <dialog ref={drawer} className="mobile-drawer" aria-label="Workspace navigation"><Button variant="ghost" className="drawer-close" aria-label="Close navigation" onClick={() => drawer.current?.close()}><X size={20} /></Button>{navigation()}</dialog>
    <div className="workspace-content">
      <header className="topbar"><div className="breadcrumbs"><Button variant="ghost" className="menu-toggle" aria-label="Open navigation" onClick={() => drawer.current?.showModal()}><Menu size={20} /></Button><span>Workspace</span><ChevronRight size={14} /><strong>{heading}</strong></div><div className="topbar-actions"><span className="build-badge"><span className="neutral-dot" /> Foundation</span><Button variant="ghost" aria-label={light ? 'Use dark theme' : 'Use light theme'} onClick={() => setLight(!light)}>{light ? <Moon size={18} /> : <Sun size={18} />}</Button></div></header>
      <main id="main" tabIndex={-1}>
        <div className="page-heading"><div><p className="eyebrow">YOUR OPERATIONS, IN ONE PLACE</p><h1>{heading}</h1><p className="subtitle">{section === 'overview' ? 'A clear view of what’s running. Start with your first service.' : descriptions[section]}</p></div>{(section === 'overview' || section === 'projects') && <Button onClick={() => explain('Project creation arrives in step 7, after the database and secure sign-in are ready.')}><Plus size={17} />New project</Button>}</div>
        <div className="foundation-note"><span className="note-icon"><Box size={17} /></span><div><strong>Your workspace is taking shape.</strong><span> Interface foundation only. Authentication, project storage and monitoring are not connected yet.</span></div><span className="step-badge">STEP 03 / 16</span></div>
        {notice && <div className="notice" role="status"><span>{notice}</span><Button variant="ghost" aria-label="Dismiss message" onClick={() => setNotice('')}><X size={17} /></Button></div>}
        {section === 'overview' ? <>
          <section className="metrics" aria-label="Workspace summary">{[{ label: 'Projects', value: '0', detail: 'No projects added', icon: Folder }, { label: 'Monitored endpoints', value: '0', detail: 'Monitoring not configured', icon: Radio }, { label: 'Service health', value: '—', detail: 'Awaiting observations', icon: Activity }, { label: 'Latest deployment', value: '—', detail: 'No deployment events', icon: GitBranch }].map(({ label, value, detail, icon: Icon }) => <div className="metric" key={label}><div className="metric-label">{label}<Icon size={16} /></div><div className="metric-value">{value}</div><p>{detail}</p></div>)}</section>
          <section className="panel setup-panel"><div className="section-heading"><div><h2>From first project to first signal</h2><p>Three milestones to a useful workspace.</p></div><span className="subtle-badge">Getting started</span></div><div className="setup-grid">{steps.map(({ number, title, text, stage, icon: Icon }) => <article className="setup-card" key={number}><div className="setup-top"><span className="setup-icon"><Icon size={21} /></span><span className="step-number">{number}</span></div><h3>{title}</h3><p>{text}</p><span className="stage-label">{stage}<ArrowRight size={14} /></span></article>)}</div></section>
          <div className="lower-grid"><section className="panel"><div className="section-heading"><h2>Services</h2><span className="subtle-badge">0 connected</span></div><Empty icon="services" title="Your first service starts here" text="Add a project to organize environments, checks and deployment history." /><div className="panel-footer"><Link href="/projects">Explore projects<ArrowRight size={15} /></Link><span>Health appears after the first check</span></div></section><section className="panel activity-panel"><div className="section-heading"><h2>Activity</h2><span className="subtle-badge">Workspace</span></div><div className="activity-empty"><span className="activity-line"><Activity size={20} /></span><h3>A quiet start</h3><p>Deployment events and incident updates will appear here once connected.</p></div><div className="activity-foot"><ShieldCheck size={16} /><span>No live infrastructure connected</span></div></section></div>
        </> : section === 'settings' ? <section className="panel settings-panel"><div className="section-heading"><div><h2>Appearance</h2><p>Choose a comfortable view for this session.</p></div></div><div className="settings-row"><div><h3>Color theme</h3><p>Currently using the {light ? 'light' : 'dark'} theme.</p></div><Button variant="outline" onClick={() => setLight(!light)}>{light ? <Moon size={16} /> : <Sun size={16} />}Switch to {light ? 'dark' : 'light'}</Button></div><div className="settings-row"><div><h3>Account & security</h3><p>Owner setup, MFA and member permissions arrive in later steps.</p></div><span className="subtle-badge">Not configured</span></div></section> : <section className="panel"><div className="section-heading"><h2>{heading}</h2><span className="subtle-badge">Not connected</span></div><Empty icon={section} title={emptyTitles[section]} text={emptyDescriptions[section]} /><div className="empty-action"><Link href="/" className={buttonVariants({ variant: 'outline' })}>Back to overview<ArrowRight size={16} /></Link></div></section>}
        <footer className="page-footer"><span><span className="neutral-dot" /> Local workspace · No live data</span><span>Built with care. Ready to grow.</span></footer>
      </main>
    </div>
  </div>;
}
const descriptions: Record<string, string> = { projects: 'Organize your services and their environments.', deployments: 'Follow the changes that reach your services.', incidents: 'Investigate issues and keep a clear recovery history.', settings: 'Make this workspace your own.' };
const emptyTitles: Record<string, string> = { projects: 'A home for every service', deployments: 'Your deployment story starts here', incidents: 'No incident history yet' };
const emptyDescriptions: Record<string, string> = { projects: 'Project creation will be connected in step 7. Your projects will appear here with their environments and health.', deployments: 'Deployment event ingestion arrives in step 11. No pipeline is connected to this workspace yet.', incidents: 'Incident detection arrives in step 12. Monitoring is not active, so this does not indicate healthy services.' };
function Empty({ icon, title, text }: { icon: string; title: string; text: string }) { const Icon = icon === 'deployments' ? ArrowDownToLine : icon === 'incidents' ? Activity : Box; return <div className="empty-state"><div className="empty-illustration"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="empty-icon"><Icon size={30} strokeWidth={1.4} /></span></div><h3>{title}</h3><p>{text}</p></div>; }

