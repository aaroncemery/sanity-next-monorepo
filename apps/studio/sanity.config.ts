import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {
  presentationTool,
  DocumentLocation,
  defineDocuments,
  defineLocations,
} from 'sanity/presentation'
import {resolveHref} from './lib/utils'

const previewUrl = 'http://localhost:3000/blog'
const embeddedOrigin = 'http://localhost:3000'

const homeLocation = {
  title: 'Home',
  href: '/blog',
} satisfies DocumentLocation

export default defineConfig({
  name: 'default',
  title: 'Aarons Shed',

  projectId: '3p5kfswt',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/blog/:slug',
            filter: `type == "post" && slug.current == $slug`,
          },
        ]),
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'caution',
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('post', doc?.slug)!,
                },
                homeLocation,
              ],
            }),
          }),
        },
      },
      previewUrl: {
        origin: previewUrl,

        previewMode: {
          enable:
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000/api/draft-mode/enable'
              : 'api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
