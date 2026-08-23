/** Work history and education. Most recent first, which is how a CV is read. */

export interface TimelineEntry {
  id: string
  role: string
  org: string
  period: string
  /** Two or three sentences. What the job actually was, not a list of duties. */
  summary: string
  highlights: readonly string[]
  status: 'current' | 'complete'
}

export const EXPERIENCE: readonly TimelineEntry[] = [
  {
    id: 'kettle',
    role: 'Principal engineer',
    org: 'Kettle',
    period: '2024 — present',
    summary:
      'Payments infrastructure for Indian marketplaces. I own the ledger and the tools the operations team lives in, and I am the person paged when settlement does not balance.',
    highlights: [
      'Shipped Ledgerloop, cutting daily reconciliation from six person-hours to twenty minutes',
      'Wrote the idempotency standard every internal service now implements',
      'Runs a fortnightly incident review that other teams started attending uninvited',
    ],
    status: 'current',
  },
  {
    id: 'northwind',
    role: 'Staff engineer',
    org: 'Northwind Commerce',
    period: '2022 — 2024',
    summary:
      'Commerce platform serving 2.4 million orders a year. Started on checkout, finished owning search, both of which had been quietly losing money for years.',
    highlights: [
      'Rebuilt checkout: conversion up 18.4%, double charges to zero',
      'Replaced a $9,400/month hosted search with a self-hosted Rust index at $340',
      'Mentored four engineers, two of whom now hold the roles I was hired into',
    ],
    status: 'complete',
  },
  {
    id: 'pulseboard',
    role: 'Senior full-stack engineer',
    org: 'Pulseboard',
    period: '2020 — 2022',
    summary:
      'Developer-tools startup, twelve engineers. Built the documentation platform and most of the public API surface people integrated against.',
    highlights: [
      'Meridian Docs: executable code samples, support tickets down 31%',
      'Designed the public API versioning scheme still in use',
      'First hire to carry the on-call pager for the API tier',
    ],
    status: 'complete',
  },
  {
    id: 'tessellate',
    role: 'Full-stack engineer',
    org: 'Tessellate Labs',
    period: '2018 — 2020',
    summary:
      'Agency work: eleven client products in two years, from a hospital rota tool to a logistics tracker. The best possible training in shipping something finished.',
    highlights: [
      'Delivered eleven production applications across React, Rails and Django',
      'Introduced the accessibility checklist the studio still ships against',
      'Learned to say no to a feature in the estimate rather than the retrospective',
    ],
    status: 'complete',
  },
]

export const EDUCATION: readonly TimelineEntry[] = [
  {
    id: 'aws-sap',
    role: 'AWS Solutions Architect — Professional',
    org: 'Amazon Web Services',
    period: '2023',
    summary: 'Renewed in 2026. Useful mostly for the parts about failure domains.',
    highlights: [],
    status: 'complete',
  },
  {
    id: 'btech',
    role: 'B.Tech, Computer Science',
    org: 'Vellore Institute of Technology',
    period: '2014 — 2018',
    summary:
      'Final-year project was a distributed key-value store that lost data under partition, which taught me more than the two years of coursework before it.',
    highlights: [],
    status: 'complete',
  },
]
