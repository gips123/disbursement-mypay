# Create New Merchant - Updated Design

## 📝 Overview

Desain create merchant telah diperbarui sesuai dengan gambar yang diberikan, menggunakan pattern dari checkout dan komponen yang sudah tersedia di repository.

## 🎨 New Design Features

### ✅ **Multi-Step Form dengan Progress Indicator**
- Progress steps di header menggunakan pattern dari `checkout/steps.tsx`
- Visual progress indicator dengan ikon untuk setiap step
- Status completed/active/pending untuk setiap langkah

### ✅ **Layout Pattern dari Checkout**
- Menggunakan `Toolbar` dari `/partials/common/toolbar`
- Container layout yang konsisten
- Side panel untuk progress tracking dan help
- Navigation buttons yang konsisten

### ✅ **Form Components yang Baru**

#### 1. **Business Profile Step**
- Company Name (required)
- Brand Name
- Business Phone Number dengan country selector (+62)
- Business Email
- Business Type dropdown
- Business Industry dropdown
- Business Website
- Company Logo upload area dengan drag & drop UI

#### 2. **Business Address Step**  
- Business Address (required)
- Country dropdown dengan flag (Indonesia default)
- Province dropdown
- City dropdown  
- District dropdown
- Sub-District dropdown
- Postal Code
- Legal Address toggle switch

#### 3. **Business Characteristics Step**
- **Characteristic Info:**
  - Business Model dropdown
  - Corporate Tax Type dropdown
- **Sales & Revenue:**
  - Current Monthly Sales dengan IDR currency
  - Estimated Monthly Sales dengan IDR currency
  - Average Estimated Revenue dengan IDR currency
- **Transfer Characteristics:**
  - Transfer Service toggle
  - Transfer Use Case dropdown (conditional)
  - Transfer Volume dropdown (conditional)

#### 4. **Bank Info Step**
- Bank Name/Code dropdown dengan search
- Account Number
- Account Name

## 🛠 **Technical Implementation**

### **Komponen Utama:**
```
src/pages/merchant-management/pages/merchant/create/
├── MerchantCreatePage.tsx          # Main page dengan toolbar
├── components/
│   ├── MerchantSteps.tsx           # Progress indicator steps
│   ├── CreateMerchantContent.tsx   # Main content container
│   ├── BusinessProfileStep.tsx     # Step 1: Business info
│   ├── BusinessAddressStep.tsx     # Step 2: Address info  
│   ├── BusinessCharacteristicsStep.tsx # Step 3: Characteristics
│   └── BankInfoStep.tsx            # Step 4: Bank info
└── hooks/
    └── useCreateMerchantPage.ts    # Existing hook
```

### **Pattern yang Digunakan:**
- ✅ **Checkout Layout Pattern**: Layout 3-kolom dengan side panel
- ✅ **Partials Components**: `Toolbar`, `ToolbarHeading`, etc.
- ✅ **Form Validation**: Zod schema untuk setiap step
- ✅ **React Hook Form**: Consistent form handling
- ✅ **UI Components**: Button, Input, Select, Switch, Card, Badge

### **Features yang Sesuai Gambar:**
- ✅ Progress indicator dengan numbered steps
- ✅ Card-based form sections
- ✅ Required field indicators (*)
- ✅ Country/Currency selectors dengan flag
- ✅ Toggle switches untuk conditional fields
- ✅ File upload area dengan styling sesuai gambar
- ✅ Navigation buttons (Cancel Creation / Next Section)
- ✅ Side panel progress tracking
- ✅ Help section di sidebar

## 🎯 **Usage**

Form akan otomatis:
1. Validate setiap step sebelum proceed
2. Menyimpan data sementara antar steps
3. Menampilkan progress di sidebar
4. Handle conditional fields (Transfer service)
5. Format currency input dengan IDR prefix

## 🚀 **Next Steps**

1. **Integrasi API**: Connect dengan existing `useCreateMerchant` hook
2. **File Upload**: Implement actual file upload untuk company logo
3. **Validation**: Tambah validation rules sesuai business requirements
4. **Save as Draft**: Implement draft functionality
5. **Success Page**: Tambah success page setelah create

## 📱 **Responsive Design**

Layout sudah responsive dengan:
- Grid system yang adaptive
- Mobile-friendly form elements
- Sidebar yang collapse di mobile
- Touch-friendly buttons dan inputs

Desain baru ini memberikan user experience yang lebih baik dengan visual progress, form validation yang jelas, dan layout yang konsisten dengan aplikasi lainnya.
