# Reusable Table Component - Restructured

Komponen table yang telah direstrukturisasi untuk organisasi code yang lebih baik, maintainable, dan scalable.

## 📁 Struktur Folder Baru

```
src/components/table/
├── 📄 index.ts                     # Main exports barrel file
├── 📄 types.ts                     # All type definitions
├── 📄 table.tsx                    # Main reusable table component
├── 📄 example-usage.tsx            # Usage examples
├── 📄 README.md                    # Documentation
│
├── 📁 core/                        # Core logic and configurations
│   ├── 📄 hooks.ts                 # Table filtering and search hooks
│   ├── 📄 table-config.ts          # Table state and configuration
│   └── 📄 column-builder.tsx       # Column creation logic
│
├── 📁 components/                  # UI Components
│   ├── 📄 actions-column.tsx       # Dropdown actions component
│   ├── 📄 table-filters.tsx        # Search, filter, sort components
│   ├── 📄 table-toolbar.tsx        # Table toolbar component
│   └── 📄 table-states.tsx         # Loading & empty states
│
└── 📁 utils/                       # Utility functions
    └── 📄 data-utils.ts             # Data processing utilities
```

## 🎯 Keunggulan Restructure

### ✅ **Better Organization**
- **Core Logic** dipisah dari **UI Components**
- **Utilities** ter-centralized untuk reusability
- **Types** terpusat untuk consistency
- **Hooks** fokus pada business logic

### ✅ **Easier Maintenance**
- Setiap file memiliki tanggung jawab spesifik
- Code lebih mudah di-debug dan di-test
- Import path yang jelas dan konsisten
- Dokumentasi inline yang baik

### ✅ **Better Scalability**
- Mudah menambah feature baru
- Component dapat di-extend secara modular
- Utility functions dapat digunakan di tempat lain
- Type safety terjaga dengan baik

### ✅ **Developer Experience**
- Auto-complete yang lebih baik
- Error messages yang jelas
- Code splitting yang optimal
- Hot reload yang lebih cepat

## 🔧 Core Components Breakdown

### 1. **`table.tsx`** - Main Component
- Entry point utama untuk table
- Mengorchestrasi semua sub-components
- Handle loading dan empty states
- Clean dan focused

### 2. **`core/hooks.ts`** - Business Logic
- `useTableFilters` untuk search, filter, sort
- Helper functions untuk data processing
- Reusable business logic

### 3. **`core/table-config.ts`** - Table Configuration
- `useTableConfiguration` untuk TanStack Table setup
- State management untuk pagination, selection, sorting
- Table instance configuration

### 4. **`core/column-builder.tsx`** - Column Logic
- `createTableColumns` untuk build column definitions
- Selection column builder
- Actions column builder
- Type-safe column creation

### 5. **`components/`** - UI Components
- **`actions-column.tsx`**: Dropdown actions per row
- **`table-filters.tsx`**: Search, filter, sort UI
- **`table-toolbar.tsx`**: Toolbar dengan custom content
- **`table-states.tsx`**: Loading dan empty states

### 6. **`utils/data-utils.ts`** - Utilities
- `generateFilterOptions` dengan auto-count
- Currency, date, time formatting
- Text utilities (truncate, initials, etc.)
- Reusable across application

## 🚀 Penggunaan

### Import Patterns

```tsx
// Main component
import { ReusableTable } from '@/components/table';

// Types
import type { TableColumn, TableAction } from '@/components/table';

// Utilities (jika diperlukan)
import { dataUtils } from '@/components/table';

// Specific components (jika perlu customization)
import { TableFilters, ActionsColumn } from '@/components/table';
```

### Basic Usage (Sama seperti sebelumnya)

```tsx
<ReusableTable
  data={yourData}
  columns={columns}
  actions={actions}
  searchable={true}
  filterable={true}
  selectable={true}
/>
```

### Advanced Usage dengan Utilities

```tsx
const columns: TableColumn<IData>[] = [
  {
    id: 'amount',
    header: 'Amount',
    cell: ({ row }) => dataUtils.formatCurrency(row.original.amount),
  },
  {
    id: 'date',
    header: 'Date',
    cell: ({ row }) => dataUtils.formatRelativeTime(row.original.createdAt),
  },
];
```

## 📊 Performance Benefits

1. **Code Splitting**: Components dimuat sesuai kebutuhan
2. **Tree Shaking**: Unused utilities tidak masuk bundle
3. **Memoization**: Better caching dengan separated concerns
4. **Bundle Size**: Lebih kecil karena modular structure

## 🔄 Migration Guide

Jika Anda sudah menggunakan versi lama:

### Before:
```tsx
import { ReusableTable } from '@/components/table/reusable-table';
```

### After:
```tsx
import { ReusableTable } from '@/components/table';
```

**Props dan API tetap sama**, hanya import path yang berubah!

## 🧪 Testing Benefits

- **Unit Testing**: Setiap function dapat ditest terpisah
- **Integration Testing**: Component interaction lebih jelas
- **Mocking**: Easier mocking karena separated dependencies

## 🔮 Future Roadmap

- [ ] Virtual scrolling untuk large datasets
- [ ] Column resizing dan reordering
- [ ] Export functionality (Excel, CSV, PDF)
- [ ] Advanced filtering (date ranges, number ranges)
- [ ] Bulk actions untuk selected rows
- [ ] Table templates untuk common use cases

---

## ✨ Kesimpulan

Restructure ini memberikan:
- **Developer Experience** yang lebih baik
- **Code Quality** yang lebih tinggi  
- **Maintenance** yang lebih mudah
- **Performance** yang lebih optimal
- **Scalability** untuk future needs

Table component sekarang siap untuk production use dan dapat dengan mudah di-extend untuk berbagai kebutuhan business logic! 🎉
