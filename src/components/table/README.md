# Reusable Table Component

Komponen table yang dapat digunakan kembali untuk berbagai halaman dengan fitur lengkap seperti pencarian, filter, sorting, pagination, dan actions.

## Fitur

- ✅ **Pencarian (Searchable)**: Pencarian multi-field dengan real-time filtering
- ✅ **Filter**: Filter berdasarkan status/kategori dengan counter otomatis
- ✅ **Sorting**: Sorting dengan multiple opsi (latest, oldest, etc.)
- ✅ **Pagination**: Pagination dengan opsi ukuran halaman yang dapat disesuaikan
- ✅ **Selection**: Checkbox selection untuk multiple rows
- ✅ **Actions**: Dropdown actions per row (edit, delete, dll)
- ✅ **Column Management**: Show/hide columns, resizable columns
- ✅ **Responsive**: Horizontal scroll untuk table yang lebar
- ✅ **Loading State**: Loading indicator
- ✅ **Empty State**: Pesan ketika tidak ada data

## Struktur File

```
src/components/table/
├── index.ts                 # Export semua komponen dan types
├── types.ts                 # Type definitions
├── hooks.ts                 # Custom hooks untuk filtering/sorting
├── reusable-table.tsx       # Komponen utama table
├── table-filters.tsx        # Komponen filter (search, filter, sort)
├── actions-column.tsx       # Komponen dropdown actions
├── example-usage.tsx        # Contoh penggunaan
└── README.md               # Dokumentasi ini
```

## Cara Penggunaan

### 1. Import Komponen

```tsx
import { ReusableTable, TableColumn, TableAction } from '@/components/table';
```

### 2. Define Data Interface

```tsx
interface IUserData {
  id: string;
  user: {
    avatar: string;
    userName: string;
    userGmail: string;
  };
  role: string;
  status: {
    label: string;
    color: 'primary' | 'success' | 'destructive' | null;
  };
  location: string;
  flag: string;
  activity: string;
}
```

### 3. Define Columns

```tsx
const columns: TableColumn<IUserData>[] = [
  {
    id: 'users',
    accessorFn: (row) => row.user,
    header: 'Member',
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <img src={row.original.user.avatar} className="rounded-full size-9" />
        <div>
          <div>{row.original.user.userName}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.user.userGmail}
          </div>
        </div>
      </div>
    ),
    size: 300,
  },
  {
    id: 'role',
    accessorKey: 'role', // Untuk kolom sederhana bisa pakai accessorKey
    header: 'Role',
    size: 180,
  },
  // ... kolom lainnya
];
```

### 4. Define Actions (Optional)

```tsx
const actions: TableAction<IUserData>[] = [
  {
    label: 'Edit',
    onClick: (item) => {
      // Handle edit
    },
  },
  {
    label: 'Delete',
    onClick: (item) => {
      // Handle delete
    },
    variant: 'destructive',
  },
];
```

### 5. Gunakan Komponen

```tsx
<ReusableTable
  data={userData}
  columns={columns}
  actions={actions}
  searchable={true}
  searchPlaceholder="Search Users..."
  searchFields={['user', 'role', 'location']}
  filterable={true}
  filterOptions={[
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ]}
  selectable={true}
  pagination={{ pageSize: 10 }}
/>
```

## Props API

### ReusableTableProps<T>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **required** | Array data yang akan ditampilkan |
| `columns` | `TableColumn<T>[]` | **required** | Definisi kolom table |
| `title` | `string` | `undefined` | Judul table |
| `searchable` | `boolean` | `true` | Aktifkan pencarian |
| `searchPlaceholder` | `string` | `"Search..."` | Placeholder input search |
| `searchFields` | `(keyof T)[]` | `[]` | Field yang dapat dicari |
| `filterable` | `boolean` | `false` | Aktifkan filter |
| `filterOptions` | `FilterOption[]` | `[]` | Opsi filter |
| `filterLabel` | `string` | `"Status"` | Label tombol filter |
| `sortable` | `boolean` | `false` | Aktifkan sorting |
| `sortOptions` | `SortOption[]` | `[]` | Opsi sorting |
| `sortDefaultValue` | `string` | `"latest"` | Default sort value |
| `actions` | `TableAction<T>[]` | `[]` | Actions per row |
| `selectable` | `boolean` | `false` | Aktifkan checkbox selection |
| `pagination` | `object` | `{ pageSize: 10 }` | Konfigurasi pagination |
| `toolbar` | `object` | `undefined` | Custom toolbar content |
| `tableLayout` | `object` | `{ ... }` | Konfigurasi layout table |
| `onRowClick` | `(item: T) => void` | `undefined` | Handler klik row |
| `loading` | `boolean` | `false` | Loading state |
| `emptyMessage` | `string` | `"No data available"` | Pesan ketika kosong |
| `className` | `string` | `undefined` | CSS class tambahan |

### TableColumn<T>

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | **required** - Unique identifier kolom |
| `accessorKey` | `string` | Key untuk mengakses data (untuk kolom sederhana) |
| `accessorFn` | `(row: T) => any` | Function untuk mengakses data (untuk kolom kompleks) |
| `header` | `string \| React.ReactNode` | **required** - Header kolom |
| `cell` | `React.ComponentType` | Custom cell renderer |
| `enableSorting` | `boolean` | Aktifkan sorting untuk kolom ini |
| `size` | `number` | Lebar kolom |
| `meta` | `object` | Metadata tambahan |

### TableAction<T>

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **required** - Label action |
| `onClick` | `(item: T) => void` | **required** - Handler click |
| `variant` | `'default' \| 'destructive'` | Variant button |
| `disabled` | `(item: T) => boolean` | Kondisi disable action |
| `hidden` | `(item: T) => boolean` | Kondisi hide action |

## Contoh Penggunaan Berbagai Skenario

### 1. Table Sederhana (Tanpa Filter/Search)

```tsx
<ReusableTable
  data={simpleData}
  columns={simpleColumns}
  searchable={false}
  filterable={false}
  sortable={false}
  selectable={false}
/>
```

### 2. Table dengan Custom Actions

```tsx
const actions: TableAction<IData>[] = [
  {
    label: 'View Details',
    onClick: (item) => navigate(`/detail/${item.id}`),
  },
  {
    label: 'Download',
    onClick: (item) => downloadFile(item.id),
    disabled: (item) => !item.hasFile,
  },
  {
    label: 'Archive',
    onClick: (item) => archiveItem(item.id),
    hidden: (item) => item.status === 'archived',
  },
];
```

### 3. Table dengan Custom Toolbar

```tsx
<ReusableTable
  data={data}
  columns={columns}
  toolbar={{
    leftContent: (
      <Button>
        <Plus />
        Add New
      </Button>
    ),
    rightContent: (
      <Button variant="outline">
        <Download />
        Export
      </Button>
    ),
  }}
/>
```

### 4. Table untuk Berbagai Data Types

```tsx
// Untuk data produk
interface IProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  status: 'active' | 'inactive';
}

// Untuk data transaksi
interface ITransaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  description: string;
}

// Tinggal sesuaikan columns dan actions sesuai kebutuhan
```

## Tips Penggunaan

1. **Performance**: Untuk data besar (>1000 rows), pertimbangkan server-side pagination
2. **Accessibility**: Semua komponen sudah mendukung keyboard navigation
3. **Responsive**: Table akan scroll horizontal pada layar kecil
4. **Customization**: Gunakan `className` dan `meta` untuk styling tambahan
5. **Type Safety**: Selalu define interface yang tepat untuk data Anda

## Troubleshooting

### Column tidak muncul
- Pastikan `id` unik untuk setiap column
- Gunakan `accessorKey` untuk data sederhana atau `accessorFn` untuk data kompleks

### Actions tidak bekerja
- Pastikan `onClick` handler terdefinisi dengan benar
- Cek apakah action tidak ter-`disabled` atau `hidden`

### Filter tidak berfungsi
- Pastikan `searchFields` merujuk ke field yang ada di data
- Untuk nested object, gunakan dot notation atau custom logic

### Performance lambat
- Batasi jumlah data per halaman dengan pagination
- Hindari re-render yang tidak perlu dengan `useMemo` dan `useCallback`
