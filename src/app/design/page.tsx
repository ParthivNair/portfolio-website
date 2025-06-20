import { Metadata } from 'next';
import DesignClient from './DesignClient';

export const metadata: Metadata = {
  title: '3D CAD Models – Design Showcase',
  description: 'Explore 3D CAD models from Parthiv Nair\'s engineering and robotics work, rendered interactively in real-time.',
  keywords: [
    '3D CAD models',
    'engineering design',
    'robotics',
    'interactive 3D models',
    'design showcase',
    'Parthiv Nair',
    'mechanical engineering',
    'product design',
  ],
  openGraph: {
    title: '3D CAD Models – Design Showcase | Parthiv Nair',
    description: 'Explore 3D CAD models from Parthiv Nair\'s engineering and robotics work, rendered interactively in real-time.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D CAD Models – Design Showcase | Parthiv Nair',
    description: 'Explore 3D CAD models from Parthiv Nair\'s engineering and robotics work, rendered interactively in real-time.',
  },
};

export default function DesignPage() {
  return <DesignClient />;
} 