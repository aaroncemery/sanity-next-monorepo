import 'server-only';

import { QueryOptions, type QueryParams } from 'next-sanity';
import { draftMode } from 'next/headers';

import { token } from './token';
import { client } from './client';

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode && !token) {
    throw new Error('Missing environment variable SANITY_API_READ_TOKEN');
  }

  const queryOptions: QueryOptions = {};
  let maybeRevalidate = revalidate;

  if (isDraftMode) {
    queryOptions.token = token;
    queryOptions.perspective = 'previewDrafts';
    queryOptions.stega = true;

    maybeRevalidate = 0; // Do not cache in Draft Mode
  } else if (tags.length) {
    maybeRevalidate = false; // Cache indefinitely if tags supplied
  }

  return client.fetch<QueryResponse>(query, params, {
    ...queryOptions,
    next: {
      revalidate: maybeRevalidate,
      tags,
    },
  });
}
