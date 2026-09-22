import { notFound } from 'next/navigation';
import { Workspace } from '@/components/workspace';
const sections = ['projects', 'deployments', 'incidents', 'settings'];
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  return { title: sections.includes(section) ? `${section[0].toUpperCase()}${section.slice(1)} · DeployDock` : 'Not found · DeployDock' };
}
export function generateStaticParams() { return sections.map(section => ({ section })); }
export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.includes(section)) notFound();
  return <Workspace section={section} />;
}
