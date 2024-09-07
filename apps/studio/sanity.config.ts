import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {presentationTool} from 'sanity/presentation'

const previewUrl = 'http://localhost:3000/blog'
const embeddedOrigin = 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'Aarons Shed',

  projectId: '3p5kfswt',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: previewUrl,

        previewMode: {
          enable: 'http://localhost:3000/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
