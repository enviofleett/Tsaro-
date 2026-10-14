import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CareersClient from './CareersClient'

export const metadata: Metadata = {
  title: 'Careers & Operational Deployments',
  description:
    'Explore high-impact technical, intelligence, and kinetic deployment opportunities at Tsaro Global Defence. Shape the future of sovereign defense infrastructure.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers & Operational Deployments | Tsaro Global Defence',
    description:
      'Join an elite cadre of tactical systems architects, field commanders, and intelligence analysts protecting critical infrastructure globally.',
    url: 'https://tsaroglobaldefence.com/careers',
    images: [
      {
        url: '/hero-banner.png',
        width: 1200,
        height: 630,
        alt: 'Tsaro Global Defence Careers and Deployments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers & Operational Deployments | Tsaro Global Defence',
    description:
      'Join an elite cadre of tactical systems architects, field commanders, and intelligence analysts protecting critical infrastructure globally.',
    images: ['/hero-banner.png'],
  },
}

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <CareersClient />
      <Footer />
    </>
  )
}
