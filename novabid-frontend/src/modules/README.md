# NovaBid Modules

This directory contains all the feature modules for the NovaBid frontend application. Each module is self-contained with its own services, hooks, types, and contexts.

## 📁 Module Structure

```
modules/
├── auth/
│   ├── service.ts      # Authentication API service
│   ├── context.tsx     # Auth context with React Query mutations
│   ├── types.ts        # Auth-related TypeScript types
│   └── index.ts        # Module exports
├── polls/
│   ├── service.ts      # Polls API service
│   ├── hooks.ts        # usePolls, useCreatePoll hooks with React Query
│   ├── types.ts        # Polls-related types
│   └── index.ts        # Module exports
├── auctions/
│   ├── service.ts      # Auctions API service
│   ├── hooks.ts        # useAuctions, useCreateAuction hooks with React Query
│   ├── types.ts        # Auctions-related types
│   └── index.ts        # Module exports
├── uploads/
│   ├── service.ts      # File upload service
│   ├── hooks.ts        # useUploadImage hook with React Query
│   ├── types.ts        # Upload-related types
│   └── index.ts        # Module exports
├── analytics/
│   ├── service.ts      # Analytics API service
│   ├── hooks.ts        # useAnalytics hook with React Query
│   ├── types.ts        # Analytics-related types
│   └── index.ts        # Module exports
├── faucet/
│   ├── service.ts      # Faucet API service
│   ├── hooks.ts        # useFaucet hook with React Query
│   ├── types.ts        # Faucet-related types
│   └── index.ts        # Module exports
├── queryKeys.ts        # Centralized React Query keys
└── index.ts            # Main module exports
```

## ⚡ React Query Integration

All modules now use **@tanstack/react-query** for optimal data fetching:

### **Query Features**
- **Caching**: Automatic caching with 5-10 minute stale times
- **Background Refetching**: Data stays fresh automatically
- **Error Handling**: Built-in error states and retry logic
- **Loading States**: isPending/isLoading states
- **Cache Invalidation**: Smart cache updates after mutations

### **Usage Examples**

```typescript
import { useAuctions, useCreateAuction } from '@/modules';

// Fetch auctions with caching
const { auctions, loading, error, refetch } = useAuctions();

// Create auction with optimistic updates
const { createAuction, isCreating } = useCreateAuction();
```

### **Query Keys**

Centralized query keys for cache management:

```typescript
import { queryKeys } from '@/modules';

// Access specific query keys
queryKeys.auctions.lists()
queryKeys.polls.lists()
queryKeys.analytics.polls()
```

## 🎯 Design Principles

### **Modular Architecture**
- Each feature is a self-contained module
- All related code (service, hooks, types) lives together
- Easy to find, modify, and maintain

### **Layered Approach**
- **Service Layer**: Direct API communication
- **Hook Layer**: React Query integration and business logic
- **Context Layer**: Global state (only for auth)

### **React Query Best Practices**
- **useQuery** for data fetching (GET operations)
- **useMutation** for data modifications (POST/PUT/DELETE)
- **Automatic cache invalidation** after successful mutations
- **Consistent error handling** across all modules

## 🔄 Direct Service Access

If you need direct service access (for special cases):

```typescript
import { pollsService, authService } from '@/modules';

// Direct service calls
const polls = await pollsService.getAllPolls();
const auth = await authService.login({ identifier: '0x...', password: '...' });
```

## 🚀 Adding New Modules

To add a new module:

1. Create folder: `modules/newModule/`
2. Add: `service.ts`, `types.ts`, `hooks.ts`, `index.ts`
3. Implement React Query in hooks.ts:
   ```typescript
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   
   export const moduleKeys = {
     all: ['module'] as const,
     lists: () => [...moduleKeys.all, 'list'] as const,
   };
   ```
4. Export from main `modules/index.ts`
5. Use in components!

This modular architecture with React Query makes the codebase more maintainable, testable, and scalable while providing an excellent developer experience with optimal data fetching.
