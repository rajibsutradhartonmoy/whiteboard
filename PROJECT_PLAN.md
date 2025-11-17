# Whiteboard - Production-Grade Collaborative Database Designer

## Executive Summary

A comprehensive, production-ready database schema designer with real-time collaboration, offline support, and multi-database modeling capabilities. Built with Next.js 14, Supabase, and React Flow.

---

## Phase Breakdown & Timeline

### Phase 1: Foundation (Weeks 1-2)
- Project setup and infrastructure
- Authentication system
- Basic project/workspace management
- Core schema designer (tables, columns, basic relationships)
- Local state management

### Phase 2: Core Features (Weeks 3-4)
- Advanced schema modeling (all SQL features)
- Multiple database type support
- Basic import/export (SQL DDL)
- Validation engine
- Offline storage with IndexedDB

### Phase 3: Collaboration (Weeks 5-6)
- Real-time sync with Supabase Realtime
- Live cursors and presence
- Conflict resolution (CRDT)
- Comments and activity feed
- Version history

### Phase 4: Professional Features (Weeks 7-8)
- Advanced import capabilities
- Comprehensive export options
- ORM code generation
- Documentation generation
- AI-powered suggestions

### Phase 5: Enterprise & Polish (Weeks 9-10)
- Team/organization management
- Advanced permissions
- Audit logs
- Performance optimization
- Full test coverage
- Deployment pipeline

### Phase 6: Monetization & Scale (Weeks 11-12)
- Stripe integration
- Subscription management
- Usage analytics
- On-premise deployment option
- Final polish and launch

---

## Complete Folder Structure (Kebab-Case)

```
whiteboard/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── e2e-tests.yml
│   │   ├── deploy-preview.yml
│   │   └── deploy-production.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug-report.md
│   │   ├── feature-request.md
│   │   └── config.yml
│   └── pull-request-template.md
│
├── .husky/
│   ├── pre-commit
│   ├── commit-msg
│   └── pre-push
│
├── apps/
│   ├── web/                                    # Main Next.js application
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── forgot-password/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── reset-password/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── verify-email/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── projects/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── new/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── [project-id]/
│   │   │   │   │       ├── page.tsx              # Redirects to designer
│   │   │   │   │       ├── settings/
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       ├── versions/
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       ├── collaborators/
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       ├── exports/
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       └── activity/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── templates/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── organization/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── members/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── billing/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── settings/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── profile/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── preferences/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── security/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── notifications/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── api-keys/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── (designer)/
│   │   │   │   ├── designer/
│   │   │   │   │   └── [project-id]/
│   │   │   │   │       └── page.tsx              # Main canvas view
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── (public)/
│   │   │   │   ├── shared/
│   │   │   │   │   └── [share-id]/
│   │   │   │   │       └── page.tsx              # Public view of shared projects
│   │   │   │   ├── embed/
│   │   │   │   │   └── [embed-id]/
│   │   │   │   │       └── page.tsx              # Embeddable diagram view
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── callback/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── signout/
│   │   │   │   │       └── route.ts
│   │   │   │   ├── projects/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [project-id]/
│   │   │   │   │       ├── route.ts
│   │   │   │   │       ├── export/
│   │   │   │   │       │   └── route.ts
│   │   │   │   │       ├── import/
│   │   │   │   │       │   └── route.ts
│   │   │   │   │       └── snapshot/
│   │   │   │   │           └── route.ts
│   │   │   │   ├── webhooks/
│   │   │   │   │   ├── stripe/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── supabase/
│   │   │   │   │       └── route.ts
│   │   │   │   ├── ai/
│   │   │   │   │   ├── suggest-schema/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── natural-language/
│   │   │   │   │       └── route.ts
│   │   │   │   └── health/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                          # Landing page
│   │   │   ├── not-found.tsx
│   │   │   ├── error.tsx
│   │   │   ├── loading.tsx
│   │   │   └── globals.css
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                               # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   ├── tooltip.tsx
│   │   │   │   ├── command.tsx
│   │   │   │   ├── popover.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── scroll-area.tsx
│   │   │   │   ├── context-menu.tsx
│   │   │   │   ├── menubar.tsx
│   │   │   │   ├── alert-dialog.tsx
│   │   │   │   ├── slider.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── radio-group.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── collapsible.tsx
│   │   │   │   ├── resizable.tsx
│   │   │   │   └── progress.tsx
│   │   │   │
│   │   │   ├── canvas/                           # React Flow components
│   │   │   │   ├── canvas-provider.tsx
│   │   │   │   ├── canvas-container.tsx
│   │   │   │   ├── canvas-controls.tsx
│   │   │   │   ├── canvas-minimap.tsx
│   │   │   │   ├── canvas-background.tsx
│   │   │   │   ├── canvas-toolbar.tsx
│   │   │   │   ├── zoom-controls.tsx
│   │   │   │   ├── selection-box.tsx
│   │   │   │   ├── connection-line.tsx
│   │   │   │   └── cursor-overlay.tsx
│   │   │   │
│   │   │   ├── nodes/                            # Custom React Flow nodes
│   │   │   │   ├── table-node/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── table-header.tsx
│   │   │   │   │   ├── column-row.tsx
│   │   │   │   │   ├── column-type-badge.tsx
│   │   │   │   │   ├── constraint-indicators.tsx
│   │   │   │   │   ├── relationship-handles.tsx
│   │   │   │   │   └── table-actions.tsx
│   │   │   │   ├── group-node/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── group-header.tsx
│   │   │   │   ├── note-node/
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── enum-node/
│   │   │   │   │   └── index.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── edges/                            # Custom React Flow edges
│   │   │   │   ├── relationship-edge/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── crow-foot-marker.tsx
│   │   │   │   │   ├── cardinality-label.tsx
│   │   │   │   │   └── edge-actions.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── panels/                           # Side panels and drawers
│   │   │   │   ├── table-panel/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── table-form.tsx
│   │   │   │   │   ├── columns-list.tsx
│   │   │   │   │   ├── column-editor.tsx
│   │   │   │   │   ├── indexes-tab.tsx
│   │   │   │   │   ├── constraints-tab.tsx
│   │   │   │   │   ├── documentation-tab.tsx
│   │   │   │   │   └── metadata-tab.tsx
│   │   │   │   ├── relationship-panel/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── relationship-form.tsx
│   │   │   │   ├── project-panel/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── tables-tree.tsx
│   │   │   │   │   ├── search-filter.tsx
│   │   │   │   │   └── quick-actions.tsx
│   │   │   │   ├── properties-panel/
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── history-panel/
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── collaboration-panel/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── presence-list.tsx
│   │   │   │   │   ├── activity-feed.tsx
│   │   │   │   │   └── comments-thread.tsx
│   │   │   │   ├── validation-panel/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── issues-list.tsx
│   │   │   │   │   └── suggestion-card.tsx
│   │   │   │   └── export-panel/
│   │   │   │       ├── index.tsx
│   │   │   │       ├── sql-export.tsx
│   │   │   │       ├── orm-export.tsx
│   │   │   │       └── diagram-export.tsx
│   │   │   │
│   │   │   ├── dialogs/                          # Modal dialogs
│   │   │   │   ├── create-project-dialog.tsx
│   │   │   │   ├── import-dialog/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── sql-import.tsx
│   │   │   │   │   ├── database-connect.tsx
│   │   │   │   │   └── file-upload.tsx
│   │   │   │   ├── export-dialog/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── export-options.tsx
│   │   │   │   ├── share-dialog.tsx
│   │   │   │   ├── settings-dialog.tsx
│   │   │   │   ├── keyboard-shortcuts-dialog.tsx
│   │   │   │   ├── command-palette.tsx
│   │   │   │   ├── template-picker-dialog.tsx
│   │   │   │   ├── database-selector-dialog.tsx
│   │   │   │   ├── ai-assistant-dialog.tsx
│   │   │   │   └── confirm-dialog.tsx
│   │   │   │
│   │   │   ├── toolbars/                         # Toolbar components
│   │   │   │   ├── main-toolbar.tsx
│   │   │   │   ├── diagram-toolbar.tsx
│   │   │   │   ├── text-toolbar.tsx
│   │   │   │   └── format-toolbar.tsx
│   │   │   │
│   │   │   ├── layout/                           # Layout components
│   │   │   │   ├── app-shell.tsx
│   │   │   │   ├── header.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── footer.tsx
│   │   │   │   ├── breadcrumbs.tsx
│   │   │   │   └── user-menu.tsx
│   │   │   │
│   │   │   ├── auth/                             # Authentication components
│   │   │   │   ├── login-form.tsx
│   │   │   │   ├── register-form.tsx
│   │   │   │   ├── forgot-password-form.tsx
│   │   │   │   ├── oauth-buttons.tsx
│   │   │   │   ├── auth-guard.tsx
│   │   │   │   └── guest-mode-banner.tsx
│   │   │   │
│   │   │   ├── collaboration/                    # Real-time collaboration
│   │   │   │   ├── cursor.tsx
│   │   │   │   ├── presence-avatar.tsx
│   │   │   │   ├── typing-indicator.tsx
│   │   │   │   ├── selection-highlight.tsx
│   │   │   │   └── conflict-resolver.tsx
│   │   │   │
│   │   │   ├── offline/                          # Offline support UI
│   │   │   │   ├── offline-indicator.tsx
│   │   │   │   ├── sync-status.tsx
│   │   │   │   ├── pending-changes.tsx
│   │   │   │   └── conflict-banner.tsx
│   │   │   │
│   │   │   ├── shared/                           # Shared/common components
│   │   │   │   ├── loading-spinner.tsx
│   │   │   │   ├── empty-state.tsx
│   │   │   │   ├── error-boundary.tsx
│   │   │   │   ├── rich-text-editor.tsx
│   │   │   │   ├── code-editor.tsx
│   │   │   │   ├── file-upload.tsx
│   │   │   │   ├── data-type-selector.tsx
│   │   │   │   ├── color-picker.tsx
│   │   │   │   ├── icon-picker.tsx
│   │   │   │   └── hotkey-display.tsx
│   │   │   │
│   │   │   └── providers/                        # Context providers
│   │   │       ├── auth-provider.tsx
│   │   │       ├── theme-provider.tsx
│   │   │       ├── offline-provider.tsx
│   │   │       ├── realtime-provider.tsx
│   │   │       ├── hotkeys-provider.tsx
│   │   │       └── toast-provider.tsx
│   │   │
│   │   ├── hooks/                                # Custom React hooks
│   │   │   ├── use-auth.ts
│   │   │   ├── use-project.ts
│   │   │   ├── use-schema.ts
│   │   │   ├── use-tables.ts
│   │   │   ├── use-relationships.ts
│   │   │   ├── use-canvas.ts
│   │   │   ├── use-realtime.ts
│   │   │   ├── use-presence.ts
│   │   │   ├── use-offline.ts
│   │   │   ├── use-sync.ts
│   │   │   ├── use-undo-redo.ts
│   │   │   ├── use-hotkeys.ts
│   │   │   ├── use-command-palette.ts
│   │   │   ├── use-local-storage.ts
│   │   │   ├── use-debounce.ts
│   │   │   ├── use-throttle.ts
│   │   │   ├── use-clipboard.ts
│   │   │   ├── use-export.ts
│   │   │   ├── use-import.ts
│   │   │   ├── use-validation.ts
│   │   │   ├── use-toast.ts
│   │   │   ├── use-media-query.ts
│   │   │   └── use-window-size.ts
│   │   │
│   │   ├── lib/                                  # Utility libraries
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts
│   │   │   │   ├── server.ts
│   │   │   │   ├── middleware.ts
│   │   │   │   └── admin.ts
│   │   │   ├── utils.ts
│   │   │   ├── cn.ts
│   │   │   └── constants.ts
│   │   │
│   │   ├── config/
│   │   │   ├── site.ts
│   │   │   ├── database-types.ts
│   │   │   ├── data-types/
│   │   │   │   ├── postgresql.ts
│   │   │   │   ├── mysql.ts
│   │   │   │   ├── sqlite.ts
│   │   │   │   ├── sqlserver.ts
│   │   │   │   ├── oracle.ts
│   │   │   │   ├── mongodb.ts
│   │   │   │   └── index.ts
│   │   │   ├── templates/
│   │   │   │   ├── ecommerce.ts
│   │   │   │   ├── saas.ts
│   │   │   │   ├── blog.ts
│   │   │   │   ├── social-network.ts
│   │   │   │   └── index.ts
│   │   │   └── keyboard-shortcuts.ts
│   │   │
│   │   ├── styles/
│   │   │   ├── canvas.css
│   │   │   ├── nodes.css
│   │   │   └── animations.css
│   │   │
│   │   ├── public/
│   │   │   ├── icons/
│   │   │   │   ├── favicon.ico
│   │   │   │   ├── icon-192.png
│   │   │   │   ├── icon-512.png
│   │   │   │   └── apple-touch-icon.png
│   │   │   ├── images/
│   │   │   │   ├── logo.svg
│   │   │   │   ├── logo-dark.svg
│   │   │   │   └── og-image.png
│   │   │   ├── manifest.json
│   │   │   ├── robots.txt
│   │   │   └── sitemap.xml
│   │   │
│   │   ├── middleware.ts
│   │   ├── instrumentation.ts
│   │   ├── next.config.mjs
│   │   ├── tailwind.config.ts
│   │   ├── postcss.config.js
│   │   ├── tsconfig.json
│   │   ├── components.json
│   │   └── package.json
│   │
│   ├── docs/                                     # Documentation site
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   └── [...slug]/
│   │   │       └── page.tsx
│   │   ├── content/
│   │   │   ├── getting-started.mdx
│   │   │   ├── features/
│   │   │   ├── api/
│   │   │   └── guides/
│   │   └── package.json
│   │
│   └── landing/                                  # Marketing landing page
│       ├── app/
│       │   ├── page.tsx
│       │   ├── pricing/
│       │   ├── features/
│       │   └── about/
│       └── package.json
│
├── packages/
│   ├── core/                                     # Core business logic
│   │   ├── src/
│   │   │   ├── schema/
│   │   │   │   ├── types.ts                      # Core schema type definitions
│   │   │   │   ├── table.ts
│   │   │   │   ├── column.ts
│   │   │   │   ├── relationship.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── constraint.ts
│   │   │   │   ├── trigger.ts
│   │   │   │   ├── view.ts
│   │   │   │   ├── enum.ts
│   │   │   │   └── validation.ts
│   │   │   │
│   │   │   ├── database/
│   │   │   │   ├── types.ts
│   │   │   │   ├── postgresql/
│   │   │   │   │   ├── data-types.ts
│   │   │   │   │   ├── generator.ts
│   │   │   │   │   ├── parser.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── mysql/
│   │   │   │   │   ├── data-types.ts
│   │   │   │   │   ├── generator.ts
│   │   │   │   │   ├── parser.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── sqlite/
│   │   │   │   ├── sqlserver/
│   │   │   │   ├── oracle/
│   │   │   │   ├── mongodb/
│   │   │   │   ├── dynamodb/
│   │   │   │   ├── firestore/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── operations/
│   │   │   │   ├── table-operations.ts
│   │   │   │   ├── column-operations.ts
│   │   │   │   ├── relationship-operations.ts
│   │   │   │   ├── index-operations.ts
│   │   │   │   ├── constraint-operations.ts
│   │   │   │   └── bulk-operations.ts
│   │   │   │
│   │   │   ├── validation/
│   │   │   │   ├── naming-conventions.ts
│   │   │   │   ├── circular-dependency.ts
│   │   │   │   ├── missing-indexes.ts
│   │   │   │   ├── normalization.ts
│   │   │   │   ├── security-audit.ts
│   │   │   │   ├── best-practices.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── collaboration/
│   │   │   │   ├── crdt/
│   │   │   │   │   ├── operation.ts
│   │   │   │   │   ├── vector-clock.ts
│   │   │   │   │   ├── merge.ts
│   │   │   │   │   └── conflict-resolution.ts
│   │   │   │   ├── presence.ts
│   │   │   │   ├── cursor.ts
│   │   │   │   └── activity.ts
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── store/                                    # State management
│   │   ├── src/
│   │   │   ├── project-store.ts
│   │   │   ├── schema-store.ts
│   │   │   ├── canvas-store.ts
│   │   │   ├── ui-store.ts
│   │   │   ├── collaboration-store.ts
│   │   │   ├── offline-store.ts
│   │   │   ├── history-store.ts
│   │   │   ├── middleware/
│   │   │   │   ├── persist.ts
│   │   │   │   ├── undo-redo.ts
│   │   │   │   ├── sync.ts
│   │   │   │   └── logger.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── offline/                                  # Offline support
│   │   ├── src/
│   │   │   ├── indexeddb/
│   │   │   │   ├── database.ts                   # Dexie.js setup
│   │   │   │   ├── schemas.ts
│   │   │   │   ├── migrations.ts
│   │   │   │   └── queries.ts
│   │   │   ├── sync/
│   │   │   │   ├── queue.ts                      # Operation queue
│   │   │   │   ├── sync-manager.ts
│   │   │   │   ├── conflict-resolver.ts
│   │   │   │   └── network-status.ts
│   │   │   ├── service-worker/
│   │   │   │   ├── sw.ts
│   │   │   │   ├── cache-strategies.ts
│   │   │   │   └── workbox-config.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── export/                                   # Export functionality
│   │   ├── src/
│   │   │   ├── sql/
│   │   │   │   ├── ddl-generator.ts
│   │   │   │   ├── migration-generator.ts
│   │   │   │   └── index.ts
│   │   │   ├── orm/
│   │   │   │   ├── prisma.ts
│   │   │   │   ├── typeorm.ts
│   │   │   │   ├── sequelize.ts
│   │   │   │   ├── sqlalchemy.ts
│   │   │   │   ├── django.ts
│   │   │   │   ├── laravel.ts
│   │   │   │   ├── mongoose.ts
│   │   │   │   └── index.ts
│   │   │   ├── api/
│   │   │   │   ├── graphql.ts
│   │   │   │   ├── rest.ts
│   │   │   │   ├── trpc.ts
│   │   │   │   └── index.ts
│   │   │   ├── docs/
│   │   │   │   ├── markdown.ts
│   │   │   │   ├── html.ts
│   │   │   │   ├── pdf.ts
│   │   │   │   └── data-dictionary.ts
│   │   │   ├── diagram/
│   │   │   │   ├── png.ts
│   │   │   │   ├── svg.ts
│   │   │   │   ├── pdf.ts
│   │   │   │   ├── mermaid.ts
│   │   │   │   └── plantuml.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── import/                                   # Import functionality
│   │   ├── src/
│   │   │   ├── sql/
│   │   │   │   ├── ddl-parser.ts
│   │   │   │   └── index.ts
│   │   │   ├── orm/
│   │   │   │   ├── prisma.ts
│   │   │   │   ├── typeorm.ts
│   │   │   │   ├── sequelize.ts
│   │   │   │   ├── mongoose.ts
│   │   │   │   └── index.ts
│   │   │   ├── schema/
│   │   │   │   ├── graphql.ts
│   │   │   │   ├── openapi.ts
│   │   │   │   ├── json-schema.ts
│   │   │   │   └── index.ts
│   │   │   ├── file/
│   │   │   │   ├── csv.ts
│   │   │   │   ├── excel.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ai/                                       # AI integration
│   │   ├── src/
│   │   │   ├── schema-suggestion.ts
│   │   │   ├── natural-language.ts
│   │   │   ├── auto-complete.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui/                                       # Shared UI utilities
│   │   ├── src/
│   │   │   ├── icons/
│   │   │   │   ├── database-icons.tsx
│   │   │   │   ├── constraint-icons.tsx
│   │   │   │   └── index.ts
│   │   │   ├── themes/
│   │   │   │   ├── light.ts
│   │   │   │   ├── dark.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── types/                                    # Shared TypeScript types
│       ├── src/
│       │   ├── database.ts
│       │   ├── schema.ts
│       │   ├── project.ts
│       │   ├── user.ts
│       │   ├── collaboration.ts
│       │   ├── canvas.ts
│       │   ├── export.ts
│       │   ├── import.ts
│       │   ├── api.ts
│       │   └── index.ts
│       │
│       ├── package.json
│       └── tsconfig.json
│
├── supabase/                                     # Supabase configuration
│   ├── config.toml
│   ├── seed.sql
│   │
│   ├── migrations/
│   │   ├── 00001_initial_schema.sql
│   │   ├── 00002_projects.sql
│   │   ├── 00003_schemas.sql
│   │   ├── 00004_collaboration.sql
│   │   ├── 00005_versions.sql
│   │   ├── 00006_audit.sql
│   │   ├── 00007_templates.sql
│   │   ├── 00008_organizations.sql
│   │   └── 00009_billing.sql
│   │
│   └── functions/
│       ├── export-schema/
│       │   └── index.ts
│       ├── import-schema/
│       │   └── index.ts
│       ├── generate-snapshot/
│       │   └── index.ts
│       ├── ai-suggestions/
│       │   └── index.ts
│       └── process-webhook/
│           └── index.ts
│
├── tests/
│   ├── unit/
│   │   ├── core/
│   │   ├── store/
│   │   ├── export/
│   │   └── import/
│   ├── integration/
│   │   ├── api/
│   │   ├── database/
│   │   └── sync/
│   ├── e2e/
│   │   ├── auth.spec.ts
│   │   ├── project-crud.spec.ts
│   │   ├── schema-design.spec.ts
│   │   ├── collaboration.spec.ts
│   │   ├── import-export.spec.ts
│   │   └── offline.spec.ts
│   ├── performance/
│   │   ├── canvas-rendering.spec.ts
│   │   └── large-schema.spec.ts
│   ├── fixtures/
│   │   ├── schemas/
│   │   └── users/
│   └── setup.ts
│
├── scripts/
│   ├── setup.sh
│   ├── generate-types.sh
│   ├── seed-database.ts
│   ├── backup.sh
│   └── deploy.sh
│
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── docker-compose.yml
│
├── .env.example
├── .env.local
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── .dockerignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── CHANGELOG.md
```

---

## Database Schema Design (Supabase/PostgreSQL)

### Core Tables

```sql
-- ============================================
-- USER & AUTHENTICATION
-- ============================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  username TEXT UNIQUE,
  bio TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations/Teams
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization members
CREATE TABLE public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  invited_by UUID REFERENCES public.profiles(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- ============================================
-- PROJECTS & WORKSPACES
-- ============================================

-- Projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  database_type TEXT NOT NULL DEFAULT 'postgresql',
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT FALSE,
  settings JSONB DEFAULT '{}'::jsonb,
  canvas_state JSONB DEFAULT '{}'::jsonb,
  tags TEXT[] DEFAULT '{}',
  folder_id UUID,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project folders
CREATE TABLE public.project_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  parent_id UUID REFERENCES public.project_folders(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project collaborators
CREATE TABLE public.project_collaborators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'editor', 'viewer')),
  invited_by UUID REFERENCES public.profiles(id),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Project shares (public links)
CREATE TABLE public.project_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  share_token TEXT UNIQUE NOT NULL,
  access_level TEXT DEFAULT 'view',
  password_hash TEXT,
  expires_at TIMESTAMPTZ,
  max_views INTEGER,
  view_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SCHEMA MODELING
-- ============================================

-- Tables
CREATE TABLE public.schema_tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  schema_name TEXT DEFAULT 'public',
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  position JSONB NOT NULL DEFAULT '{"x": 0, "y": 0}'::jsonb,
  is_view BOOLEAN DEFAULT FALSE,
  view_definition TEXT,
  table_options JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, schema_name, name)
);

-- Columns
CREATE TABLE public.schema_columns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID NOT NULL REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  data_type TEXT NOT NULL,
  is_primary_key BOOLEAN DEFAULT FALSE,
  is_nullable BOOLEAN DEFAULT TRUE,
  is_unique BOOLEAN DEFAULT FALSE,
  is_array BOOLEAN DEFAULT FALSE,
  default_value TEXT,
  check_constraint TEXT,
  description TEXT,
  ordinal_position INTEGER NOT NULL,
  column_options JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(table_id, name)
);

-- Relationships/Foreign Keys
CREATE TABLE public.schema_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT,
  source_table_id UUID NOT NULL REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  target_table_id UUID NOT NULL REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  source_column_id UUID NOT NULL REFERENCES public.schema_columns(id) ON DELETE CASCADE,
  target_column_id UUID NOT NULL REFERENCES public.schema_columns(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL CHECK (relationship_type IN ('one-to-one', 'one-to-many', 'many-to-many')),
  on_delete TEXT DEFAULT 'NO ACTION',
  on_update TEXT DEFAULT 'NO ACTION',
  is_composite BOOLEAN DEFAULT FALSE,
  composite_columns JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE TABLE public.schema_indexes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID NOT NULL REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'btree',
  columns UUID[] NOT NULL,
  is_unique BOOLEAN DEFAULT FALSE,
  where_clause TEXT,
  include_columns UUID[],
  options JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Constraints
CREATE TABLE public.schema_constraints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID NOT NULL REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('check', 'unique', 'exclude')),
  definition TEXT NOT NULL,
  columns UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enums
CREATE TABLE public.schema_enums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  values TEXT[] NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, name)
);

-- Triggers
CREATE TABLE public.schema_triggers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID NOT NULL REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  timing TEXT NOT NULL CHECK (timing IN ('BEFORE', 'AFTER', 'INSTEAD OF')),
  event TEXT NOT NULL CHECK (event IN ('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE')),
  function_name TEXT NOT NULL,
  function_body TEXT,
  condition TEXT,
  for_each TEXT DEFAULT 'ROW',
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- VERSION CONTROL & HISTORY
-- ============================================

-- Version snapshots
CREATE TABLE public.project_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  name TEXT,
  description TEXT,
  snapshot JSONB NOT NULL,
  parent_version_id UUID REFERENCES public.project_versions(id),
  is_branch BOOLEAN DEFAULT FALSE,
  branch_name TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, version_number)
);

-- Operation history for undo/redo
CREATE TABLE public.operation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  operation_type TEXT NOT NULL,
  operation_data JSONB NOT NULL,
  inverse_operation JSONB NOT NULL,
  timestamp BIGINT NOT NULL,
  vector_clock JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COLLABORATION & REAL-TIME
-- ============================================

-- User presence
CREATE TABLE public.presence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cursor_position JSONB,
  selected_elements UUID[],
  last_active TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  UNIQUE(project_id, user_id)
);

-- Comments
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  table_id UUID REFERENCES public.schema_tables(id) ON DELETE CASCADE,
  column_id UUID REFERENCES public.schema_columns(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  mentions UUID[],
  resolved BOOLEAN DEFAULT FALSE,
  resolved_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity feed
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TEMPLATES & PRESETS
-- ============================================

-- Project templates
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  database_type TEXT NOT NULL,
  schema_data JSONB NOT NULL,
  preview_image_url TEXT,
  is_official BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.profiles(id),
  use_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AUDIT & COMPLIANCE
-- ============================================

-- Audit logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EXPORTS & IMPORTS
-- ============================================

-- Export history
CREATE TABLE public.exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  export_type TEXT NOT NULL,
  format TEXT NOT NULL,
  file_url TEXT,
  file_size INTEGER,
  options JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Import history
CREATE TABLE public.imports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  import_type TEXT NOT NULL,
  source_file_url TEXT,
  status TEXT DEFAULT 'pending',
  result JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_projects_owner ON public.projects(owner_id);
CREATE INDEX idx_projects_org ON public.projects(organization_id);
CREATE INDEX idx_schema_tables_project ON public.schema_tables(project_id);
CREATE INDEX idx_schema_columns_table ON public.schema_columns(table_id);
CREATE INDEX idx_schema_relationships_project ON public.schema_relationships(project_id);
CREATE INDEX idx_activities_project ON public.activities(project_id);
CREATE INDEX idx_activities_created ON public.activities(created_at DESC);
CREATE INDEX idx_comments_project ON public.comments(project_id);
CREATE INDEX idx_operation_history_project ON public.operation_history(project_id);
CREATE INDEX idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schema_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schema_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schema_relationships ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Projects are visible to owner and collaborators
CREATE POLICY "Projects visible to owner and collaborators" ON public.projects
  FOR SELECT USING (
    owner_id = auth.uid()
    OR is_public = true
    OR id IN (
      SELECT project_id FROM public.project_collaborators
      WHERE user_id = auth.uid()
    )
  );

-- Project owner can do everything
CREATE POLICY "Project owner has full access" ON public.projects
  FOR ALL USING (owner_id = auth.uid());

-- Tables visible based on project access
CREATE POLICY "Tables visible based on project access" ON public.schema_tables
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects
      WHERE owner_id = auth.uid()
        OR is_public = true
        OR id IN (
          SELECT project_id FROM public.project_collaborators
          WHERE user_id = auth.uid()
        )
    )
  );
```

---

## Component Architecture

### State Management (Zustand + Immer)

```typescript
// packages/store/src/schema-store.ts
interface SchemaState {
  tables: Map<string, Table>;
  relationships: Map<string, Relationship>;
  indexes: Map<string, Index>;
  enums: Map<string, Enum>;

  // Actions
  addTable: (table: Table) => void;
  updateTable: (id: string, updates: Partial<Table>) => void;
  deleteTable: (id: string) => void;
  addColumn: (tableId: string, column: Column) => void;
  // ... more actions
}

// packages/store/src/canvas-store.ts
interface CanvasState {
  viewport: Viewport;
  selectedNodes: string[];
  selectedEdges: string[];
  zoom: number;
  pan: { x: number; y: number };

  // Actions
  setViewport: (viewport: Viewport) => void;
  selectNodes: (ids: string[]) => void;
  // ... more actions
}
```

### React Flow Integration

```typescript
// apps/web/components/canvas/canvas-container.tsx
interface CanvasContainerProps {
  projectId: string;
}

// Custom node types
const nodeTypes = {
  table: TableNode,
  group: GroupNode,
  note: NoteNode,
  enum: EnumNode,
};

// Custom edge types
const edgeTypes = {
  relationship: RelationshipEdge,
};
```

### Real-time Collaboration Architecture

```typescript
// packages/core/src/collaboration/crdt/operation.ts
interface Operation {
  id: string;
  type: OperationType;
  data: any;
  timestamp: number;
  userId: string;
  vectorClock: VectorClock;
}

// Three-way merge for conflict resolution
interface ConflictResolution {
  base: SchemaState;
  local: SchemaState;
  remote: SchemaState;
  merged: SchemaState;
  conflicts: Conflict[];
}
```

### Offline Sync Architecture

```typescript
// packages/offline/src/indexeddb/database.ts
class OfflineDatabase extends Dexie {
  projects!: Table<Project>;
  tables!: Table<SchemaTable>;
  columns!: Table<Column>;
  operations!: Table<PendingOperation>;

  constructor() {
    super('whiteboard-offline');
    this.version(1).stores({
      projects: 'id, updatedAt',
      tables: 'id, projectId',
      columns: 'id, tableId',
      operations: '++id, projectId, timestamp',
    });
  }
}

// packages/offline/src/sync/sync-manager.ts
class SyncManager {
  private queue: OperationQueue;
  private networkStatus: NetworkStatus;

  async sync(): Promise<SyncResult> {
    // 1. Get pending operations
    // 2. Apply to server
    // 3. Resolve conflicts
    // 4. Update local state
  }
}
```

---

## Technology Stack Summary

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand + Immer
- **Server State**: TanStack Query (React Query)
- **Canvas**: React Flow
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor
- **Offline**: Dexie.js + Workbox

### Backend
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage
- **Edge Functions**: Supabase Edge Functions

### DevOps
- **Monorepo**: Turborepo + pnpm
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel
- **Testing**: Jest + Playwright
- **Error Tracking**: Sentry

---

## AI Features Clarification

Based on your question "Where we are using AI?", here are the AI-powered features:

1. **Schema Suggestions** - AI analyzes table names and suggests related columns
2. **Natural Language to Schema** - "Create a users table with email and password" → generates table
3. **Auto-complete** - Intelligent suggestions while typing column names/types
4. **Normalization Recommendations** - AI identifies denormalization issues
5. **Security Audit** - Automatically flags potential security concerns

**Implementation**: These can use OpenAI/Claude API or be deferred to later phases.

---

## Critical Path for MVP (4-6 weeks)

### Week 1-2: Foundation
- [ ] Project setup (monorepo, TypeScript, linting)
- [ ] Supabase setup (database, auth, RLS)
- [ ] Basic auth flow (login, register, logout)
- [ ] Project CRUD
- [ ] Basic canvas with React Flow

### Week 3-4: Core Designer
- [ ] Table nodes (create, edit, delete)
- [ ] Column management
- [ ] Relationship edges
- [ ] PostgreSQL & MySQL support
- [ ] Basic SQL DDL export

### Week 5-6: Offline & Collaboration
- [ ] IndexedDB storage with Dexie.js
- [ ] Operation queue
- [ ] Basic conflict resolution
- [ ] Supabase Realtime integration
- [ ] Presence indicators

### Post-MVP
- Advanced features, more databases, AI, enterprise features

---

## Next Steps

**Shall I proceed with:**
1. Setting up the complete project infrastructure (package.json, configs, etc.)?
2. Creating the Supabase database schema?
3. Building the core components?

Let me know which phase to start with, and I'll begin implementation immediately.
