// ./src/sanity/env.ts

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-08-20';
export const useCdn = process.env.NODE_ENV === 'production';
