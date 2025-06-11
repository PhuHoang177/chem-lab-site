import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {SetUpdatedAtAction} from './actions/updatedAt'

export default defineConfig({
  name: 'default',
  title: 'chem-lab-site',

  projectId: 'qort1r0u',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) =>
      prev.map((action) => (action.action === 'publish' ? SetUpdatedAtAction : action)),
  },
})
