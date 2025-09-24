# Merchant CRUD - Restructured

Struktur baru yang lebih optimal dan terorganisir untuk manajemen CRUD Merchant.

## 📁 Struktur Folder Baru

```
src/pages/merchant-management/pages/merchant/
├── list/                           # LIST module
│   ├── MerchantListPage.tsx       
│   ├── components/
│   │   ├── MerchantListTable.tsx   # Table component
│   │   ├── MerchantListActions.tsx # Table actions logic
│   │   ├── MerchantListDialogs.tsx # Dialog components
│   │   └── index.ts
│   ├── hooks/
│   │   └── useMerchantList.ts      # Business logic & state management
│   └── index.ts
├── create/                         # CREATE module
│   ├── MerchantCreatePage.tsx
│   ├── components/
│   │   ├── CreateMerchantForm.tsx  # Create form wrapper
│   │   └── index.ts
│   ├── hooks/
│   │   └── useCreateMerchantPage.ts # Create logic & navigation
│   └── index.ts
├── detail/                         # DETAIL/VIEW module
│   ├── MerchantDetailPage.tsx
│   ├── components/
│   │   ├── MerchantDetailTabs.tsx  # Main tabs component
│   │   ├── MerchantStatusCards.tsx # Status cards
│   │   ├── MerchantOverview.tsx    # Overview tab
│   │   ├── MerchantFinancial.tsx   # Financial tab
│   │   ├── MerchantCompliance.tsx  # Compliance tab
│   │   ├── statusUtils.tsx         # Status icon utilities
│   │   └── index.ts
│   ├── hooks/
│   │   └── useMerchantDetail.ts    # Detail logic & navigation
│   └── index.ts
├── edit/                           # EDIT/UPDATE module
│   ├── MerchantEditPage.tsx
│   ├── components/
│   │   ├── EditMerchantForm.tsx    # Edit form wrapper
│   │   └── index.ts
│   ├── hooks/
│   │   └── useEditMerchantPage.ts  # Edit logic & data transformation
│   └── index.ts
└── index.ts                        # Main exports
```

## ✨ Keunggulan Struktur Baru

### 1. **Separation of Concerns**
- Setiap operasi CRUD memiliki folder terpisah
- Business logic terpisah di custom hooks
- UI components terpisah dari logic

### 2. **Reusability**
- Hooks dapat digunakan ulang
- Components dapat di-compose dengan mudah
- Logic dapat ditest secara terpisah

### 3. **Maintainability**
- Mudah mencari dan memodifikasi code
- Dependencies yang jelas
- Struktur yang konsisten

### 4. **Scalability**
- Mudah menambah fitur baru
- Mudah refactor tanpa breaking changes
- Team dapat bekerja parallel tanpa conflict

## 🔧 Komponen Utama

### LIST Module
- **useMerchantList**: Mengelola state, dialog, dan actions
- **MerchantListTable**: Pure table component
- **MerchantListDialogs**: Dialog management component
- **useMerchantListActions**: Table actions configuration

### CREATE Module
- **useCreateMerchantPage**: Create logic dan navigation
- **CreateMerchantForm**: Form wrapper component

### DETAIL Module
- **useMerchantDetail**: Detail data dan navigation
- **MerchantDetailTabs**: Main tabs interface
- **MerchantStatusCards**: Status overview cards
- **Individual tab components**: Terpisah untuk setiap tab

### EDIT Module
- **useEditMerchantPage**: Edit logic dan data transformation
- **EditMerchantForm**: Edit form wrapper

## 🎯 Best Practices Applied

1. **Custom Hooks Pattern**: Business logic terpisah dari UI
2. **Composition Pattern**: Components yang dapat di-compose
3. **Single Responsibility**: Setiap file/function punya tujuan spesifik
4. **DRY Principle**: Tidak ada duplikasi logic
5. **TypeScript**: Type safety di semua level
6. **Consistent Naming**: Naming convention yang konsisten

## 🚀 Penggunaan

```typescript
// Import individual pages
import { MerchantListPage } from './merchant/list';
import { MerchantCreatePage } from './merchant/create';
import { MerchantDetailPage } from './merchant/detail';
import { MerchantEditPage } from './merchant/edit';

// Or import all at once
import * as MerchantPages from './merchant';

// Import individual hooks for custom usage
import { useMerchantList } from './merchant/list/hooks/useMerchantList';
import { useMerchantDetail } from './merchant/detail/hooks/useMerchantDetail';
```

## 📝 Migration Guide

Untuk routing, update path imports dari:
```typescript
// Old
import { MerchantListPage } from './pages/merchant-list/MerchantListPage';

// New
import { MerchantListPage } from './pages/merchant/list';
```

## 🔄 Future Enhancements

Struktur ini memungkinkan penambahan fitur seperti:
- Bulk operations
- Advanced filtering
- Export/Import functionality
- Real-time updates
- Audit trails

Setiap enhancement dapat ditambahkan tanpa merusak struktur yang ada.
