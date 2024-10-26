# Cloudflare KV CRUD UI

Data management UI for Cloudflare KV.  User can view, add, edit, and delete KV data while preserving the integrity of the data.

## Installation
## Usage

## Development

### Tailwind 

### React Components

main.tsx defines the outline of the UI.  ThemeProvider manages the theme of the UI.  Layout component imported from @/layout.tsx defines the header and main content section of the UI.  KVTableUnit component is imported from @/components/kvTable/kvTableUnit.tsx and defines the UI for the KV Table.  Currently KVTableUnit is the only component residing in the main content section.  If a new component is added, it should be added as a new child to the Layout component.

KVTableUnit is a table component wrapped in card component.  