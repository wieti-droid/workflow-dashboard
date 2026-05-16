// src/data.ts
import type { Workflow } from './types';

export const defaultWorkflows: Workflow[] = [
  {
    id: '1',
    title: 'Patient Onboarding',
    subtitle: 'New patient registration',
    icon: '🏥',
    color: '#2563eb',
    stages: [
      { id: 's1', name: 'Intake Form', status: 'completed', date: '2026-05-10' },
      { id: 's2', name: 'Insurance Verification', status: 'completed', date: '2026-05-11' },
      { id: 's3', name: 'Medical History Review', status: 'in-progress' },
      { id: 's4', name: 'Initial Consultation', status: 'pending' },
      { id: 's5', name: 'Treatment Plan', status: 'pending' },
    ],
  },
  {
    id: '2',
    title: 'Office Renovation',
    subtitle: 'Home office project',
    icon: '🔨',
    color: '#059669',
    stages: [
      { id: 's1', name: 'Quote Review', status: 'completed', date: '2026-04-15' },
      { id: 's2', name: 'Vendor Selection', status: 'in-progress' },
      { id: 's3', name: 'Window Installation', status: 'pending' },
      { id: 's4', name: 'Toilet Renovation', status: 'blocked' },
      { id: 's5', name: 'Bookshelf Setup', status: 'pending' },
    ],
  },
  {
    id: '3',
    title: 'Travel Planning',
    subtitle: 'Upcoming trip',
    icon: '✈️',
    color: '#d97706',
    stages: [
      { id: 's1', name: 'Destination Research', status: 'completed', date: '2026-05-01' },
      { id: 's2', name: 'Flight Booking', status: 'completed', date: '2026-05-05' },
      { id: 's3', name: 'Hotel Reservation', status: 'in-progress' },
      { id: 's4', name: 'Itinerary Planning', status: 'pending' },
      { id: 's5', name: 'Travel Insurance', status: 'pending' },
    ],
  },
];
