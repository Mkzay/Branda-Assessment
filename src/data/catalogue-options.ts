import type { Category } from '@/types';
export const categories: {
  id: Category;
  name: string;
  description: string;
  number: string;
}[] = [
  {
    id: 'digital',
    name: 'Digital',
    description: 'Build a presence that performs.',
    number: '01',
  },
  {
    id: 'gifts',
    name: 'Gifts',
    description: 'Make every gesture count.',
    number: '02',
  },
  {
    id: 'create',
    name: 'Create',
    description: 'Shape a brand that feels like you.',
    number: '03',
  },
  {
    id: 'studio',
    name: 'Studio',
    description: 'Bring the big picture to life.',
    number: '04',
  },
  {
    id: 'prints',
    name: 'Prints',
    description: 'Put your story into the world.',
    number: '05',
  },
];
export const industries = [
  'startups',
  'corporate',
  'retail',
  'hospitality',
  'events',
  'beauty',
  'technology',
  'professional-services',
];
