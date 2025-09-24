# Naming Strategy - Avoiding Export Conflicts

## 🚨 Problem Solved

Terjadi konflik naming antara:
- **Core types/interfaces**: `MerchantCompliance`, `MerchantFinancial`, `useMerchantList`, `useMerchantDetail`
- **Page components**: dengan nama yang sama

## ✅ Solution Applied

### 1. **Explicit Re-exports dengan Alias**

```typescript
// ❌ Before (caused conflicts)
export * from './core';
export * from './pages';

// ✅ After (resolved conflicts)
export * from './core';
export { 
  MerchantListPage,
  MerchantCreatePage, 
  MerchantDetailPage,
  MerchantEditPage,
  // Hooks dengan suffix 'Page' untuk membedakan dari core hooks
  useMerchantListPage,
  useMerchantDetailPage,
  useCreateMerchantPage,
  useEditMerchantPage,
  // Components dengan suffix 'Tab' untuk membedakan dari core types
  MerchantComplianceTab,
  MerchantFinancialTab
} from './pages';
```

### 2. **Naming Conventions Established**

| Type | Core Export | Page Export | Purpose |
|------|-------------|-------------|----------|
| **Interfaces** | `MerchantCompliance` | `MerchantComplianceTab` | Core: data model, Page: UI component |
| **Interfaces** | `MerchantFinancial` | `MerchantFinancialTab` | Core: data model, Page: UI component |
| **Hooks** | `useMerchantList` | `useMerchantListPage` | Core: API queries, Page: page logic |
| **Hooks** | `useMerchantDetail` | `useMerchantDetailPage` | Core: API queries, Page: page logic |

## 🎯 Best Practices for Future Development

### 1. **Naming Suffixes**
- **Core**: Pure names (`MerchantCompliance`, `useMerchantList`)
- **Pages**: Add meaningful suffixes (`MerchantComplianceTab`, `useMerchantListPage`)
- **Components**: Add context (`CreateMerchantForm`, `MerchantListTable`)

### 2. **Export Strategy**
```typescript
// Use explicit re-exports instead of wildcard exports when conflicts exist
export { 
  SpecificExport1,
  SpecificExport2 as AliasedExport2
} from './module';

// Instead of:
export * from './module'; // Can cause naming conflicts
```

### 3. **Module Boundaries**
- **Core**: Types, interfaces, API hooks, constants
- **Components**: Reusable UI components
- **Pages**: Page-specific logic and components
- **Utils**: Helper functions and utilities

## 📝 Migration Impact

### Before
```typescript
// Could cause confusion
import { MerchantCompliance } from './merchant-management';
// Is this the type or the component?
```

### After
```typescript
// Clear distinction
import { MerchantCompliance } from './merchant-management'; // Type from core
import { MerchantComplianceTab } from './merchant-management'; // Component from pages
```

## 🔍 Verification

All TypeScript errors resolved:
- ✅ No more "Module has already exported a member" errors
- ✅ Clear distinction between core types and page components
- ✅ Maintainable naming convention established

This approach ensures that both core functionality and page components can coexist without naming conflicts while maintaining clear semantic meaning.
