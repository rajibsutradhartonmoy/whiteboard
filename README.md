# Whiteboard - Collaborative Database Schema Designer

A professional, production-ready database schema designer with real-time collaboration, offline support, and comprehensive database modeling features. Built with Next.js 14, Supabase, and React Flow.

## Features

### Phase 1 - Foundation (Completed)
- Monorepo setup with Turborepo and pnpm
- Type-safe development with comprehensive TypeScript types
- Supabase authentication (email/password + OAuth)
- Project management dashboard
- React Flow canvas with custom table nodes
- State management with Zustand + Immer

### Phase 2 - Core Features (Completed)
- Offline storage with IndexedDB (Dexie.js)
- SQL DDL export for PostgreSQL and MySQL
- Sync queue for offline changes

### Phase 3 - Collaboration (Completed)
- Real-time collaboration with Supabase Realtime
- Live cursors and presence indicators
- User activity tracking
- Database migrations with Row Level Security

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand + Immer
- **Server State**: TanStack Query (React Query)
- **Canvas**: React Flow (@xyflow/react)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Offline**: Dexie.js (IndexedDB)
- **Monorepo**: Turborepo + pnpm

## Project Structure

```
whiteboard/
├── apps/
│   └── web/                    # Next.js 14 application
│       ├── app/                # App Router pages
│       ├── components/         # React components
│       ├── hooks/              # Custom React hooks
│       ├── lib/                # Utility libraries
│       └── stores/             # Zustand stores
├── packages/
│   ├── types/                  # Shared TypeScript types
│   ├── store/                  # Store utilities
│   ├── offline/                # IndexedDB + sync
│   └── export/                 # SQL DDL generators
├── supabase/
│   ├── config.toml             # Supabase config
│   └── migrations/             # Database migrations
└── PROJECT_PLAN.md             # Full project plan
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Supabase account or local Supabase instance

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd whiteboard
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Set up Supabase database:

**Option A: Using Supabase CLI (recommended)**
```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# Run migrations
supabase db push
```

**Option B: Using Supabase Cloud**
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Run the migration script from `supabase/migrations/00001_initial_schema.sql`

5. Start the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run type checking
pnpm type-check

# Lint code
pnpm lint

# Format code
pnpm format
```

### Working with Packages

The monorepo contains several packages:

- **@whiteboard/types** - Core TypeScript type definitions
- **@whiteboard/store** - Zustand store utilities
- **@whiteboard/offline** - IndexedDB and sync management
- **@whiteboard/export** - SQL DDL code generators

### Adding New Features

1. **Adding a new database type**:
   - Add types in `packages/types/src/database.ts`
   - Create generator in `packages/export/src/sql/`

2. **Adding UI components**:
   - Use shadcn/ui CLI: `npx shadcn-ui@latest add <component>`
   - Components are in `apps/web/components/ui/`

3. **Adding new stores**:
   - Create in `apps/web/stores/`
   - Use Zustand with Immer middleware

## Database Schema

The application uses the following core tables:

- **profiles** - User profiles (extends Supabase auth)
- **projects** - Database design projects
- **schema_tables** - Tables in a project
- **schema_columns** - Columns in tables
- **schema_relationships** - Foreign key relationships
- **comments** - Collaboration comments
- **activities** - Activity feed
- **presence** - Real-time user presence
- **project_versions** - Version history snapshots

All tables have Row Level Security (RLS) policies for data protection.

## Key Features Implementation

### Real-time Collaboration

```typescript
// Using the realtime hook
const { broadcast, updateCursor } = useRealtime({
  projectId,
  onEvent: (event) => console.log('Received:', event),
  onPresenceSync: (users) => setOnlineUsers(users),
});

// Broadcast schema changes
broadcast('table:create', { tableId, data });

// Update cursor position
updateCursor({ x: mouseX, y: mouseY });
```

### Offline Support

```typescript
// Local database operations
import { db } from '@whiteboard/offline';

// Save locally
await db.saveProjectLocally(project);

// Queue for sync
await db.addPendingOperation({
  projectId,
  operationType: 'create',
  entityType: 'table',
  entityId: tableId,
  data: tableData,
});

// Sync when online
import { syncManager } from '@whiteboard/offline';
const result = await syncManager.syncAll();
```

### SQL Export

```typescript
import { generatePostgreSQLDDL, generateMySQLDDL } from '@whiteboard/export';

// Generate PostgreSQL
const sql = generatePostgreSQLDDL(tables, columns, relationships, indexes, {
  includeDropStatements: false,
  includeComments: true,
});

// Generate MySQL
const mysqlSql = generateMySQLDDL(tables, columns, relationships, indexes, {
  engine: 'InnoDB',
  charset: 'utf8mb4',
});
```

## What's Next

### Remaining Phase 2 Features
- Schema validation engine
- Import from SQL files
- More database types (SQLite, SQL Server, MongoDB)

### Remaining Phase 3 Features
- CRDT conflict resolution
- Comments on tables/columns
- Full activity feed
- Version branching and merging

### Phase 4-6 Features
- ORM code generation (Prisma, TypeORM, etc.)
- AI-powered schema suggestions
- Enterprise features (SSO, audit logs)
- Stripe payment integration

See `PROJECT_PLAN.md` for the complete roadmap.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private. All rights reserved.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [React Flow](https://reactflow.dev/) - Node-based diagram library
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Dexie.js](https://dexie.org/) - IndexedDB wrapper
