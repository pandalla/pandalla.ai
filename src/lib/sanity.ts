import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '8zqwwfek',
  dataset: 'pandalla_blog',
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production',
})