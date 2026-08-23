/** Three quotes. Avatars come from i.pravatar.cc, which is stable per img index. */

export interface Quote {
  id: string
  quote: string
  author: string
  role: string
  avatar: string
}

export const TESTIMONIALS: readonly Quote[] = [
  {
    id: 'priya',
    quote:
      'Arjun found the double-charge bug in our checkout by reading the retry logic, not the logs. It had been costing us refunds for a year and three engineers had looked at it before him.',
    author: 'Priya Raghavan',
    role: 'VP Engineering, Northwind Commerce',
    avatar: 'https://i.pravatar.cc/160?img=45',
  },
  {
    id: 'daniel',
    quote:
      'He is the rare engineer who will tell you the feature is a bad idea in the estimate rather than the retrospective. We shipped less and it worked better.',
    author: 'Daniel Okonkwo',
    role: 'Head of Product, Pulseboard',
    avatar: 'https://i.pravatar.cc/160?img=12',
  },
  {
    id: 'mei',
    quote:
      'Our reconciliation used to eat three people every morning. After Ledgerloop it is one person for twenty minutes, and I have stopped dreading month end.',
    author: 'Mei-Ling Chow',
    role: 'Head of Operations, Kettle',
    avatar: 'https://i.pravatar.cc/160?img=32',
  },
]
