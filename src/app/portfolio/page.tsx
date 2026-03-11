import type { Metadata } from 'next';
import PortfolioContent from './components/PortfolioContent';

export const metadata: Metadata = {
  title: 'Thatcher McClure — Portfolio',
  description:
    'Software engineer portfolio showcasing projects, skills, and experience in full-stack web development.',
  openGraph: {
    title: 'Thatcher McClure — Portfolio',
    description:
      'Software engineer portfolio showcasing projects, skills, and experience in full-stack web development.',
    url: 'https://thatchermcc.com/portfolio',
    siteName: 'Thatcher McClure',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thatcher McClure — Portfolio',
    description:
      'Software engineer portfolio showcasing projects, skills, and experience in full-stack web development.',
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
