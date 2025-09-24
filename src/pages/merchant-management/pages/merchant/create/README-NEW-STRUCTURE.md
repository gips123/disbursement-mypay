# Merchant Creation - New Step-Based Structure

## 📝 Overview

The merchant creation process has been completely restructured to follow a step-based approach similar to the checkout flow. This provides a better user experience with clear progress tracking and organized information collection.

## 🎯 Key Features

### ✅ **Multi-Step Process**
- **6 distinct steps** with clear progression
- **Visual progress indicator** at the top of each step
- **Step-by-step navigation** with previous/next buttons
- **Progress tracking** in the sidebar

### ✅ **Consistent Layout Pattern**
- **3-column layout** (main content + sidebar)
- **Toolbar** with step-specific actions
- **Summary cards** in the sidebar
- **Help sections** for user assistance

### ✅ **Comprehensive Form Handling**
- **React Hook Form** with Zod validation
- **Step-specific schemas** for data validation
- **Form state management** across steps
- **Error handling** and user feedback

## 🏗️ Structure

```
src/pages/merchant-management/pages/merchant/create/
├── MerchantCreatePage.tsx              # Main page (redirects to first step)
├── merchant-create-routing.tsx         # Routing configuration
├── index.ts                           # Main exports
├── components/                        # Shared components
│   ├── MerchantSteps.tsx              # Progress indicator
│   ├── CreateMerchantContent.tsx      # Legacy content (deprecated)
│   └── ...
├── hooks/                            # Shared hooks
│   └── useCreateMerchantPage.ts       # Main hook
├── business-info/                     # Step 1: Business Information
│   ├── business-info-page.tsx         # Page component
│   ├── business-info-content.tsx      # Content layout
│   ├── components/
│   │   ├── business-info-form.tsx     # Form component
│   │   └── business-info-summary.tsx  # Sidebar summary
│   └── index.ts                       # Step exports
├── pic-info/                         # Step 2: PIC Information
│   ├── pic-info-page.tsx
│   ├── pic-info-content.tsx
│   ├── components/
│   │   ├── pic-info-form.tsx
│   │   └── pic-info-summary.tsx
│   └── index.ts
├── documents/                        # Step 3: Required Documents
│   ├── documents-page.tsx
│   ├── documents-content.tsx
│   ├── components/
│   │   ├── documents-form.tsx
│   │   └── documents-summary.tsx
│   └── index.ts
├── services/                         # Step 4: Service Configuration
│   ├── services-page.tsx
│   ├── services-content.tsx
│   ├── components/
│   │   ├── services-form.tsx
│   │   └── services-summary.tsx
│   └── index.ts
├── privacy/                          # Step 5: Privacy & Terms
│   ├── privacy-page.tsx
│   ├── privacy-content.tsx
│   ├── components/
│   │   ├── privacy-form.tsx
│   │   └── privacy-summary.tsx
│   └── index.ts
└── notes/                            # Step 6: Review & Submit
    ├── notes-page.tsx
    ├── notes-content.tsx
    ├── components/
    │   ├── notes-form.tsx
    │   └── notes-summary.tsx
    └── index.ts
```

## 🚀 Step Details

### 1. **Business Information** (`/business-info`)
- **Company details**: Name, brand, type, industry
- **Contact information**: Phone, email, website
- **Company logo upload**
- **Business description**
- **Legal address toggle**

### 2. **PIC Information** (`/pic-info`)
- **Personal details**: Name, position, contact info
- **ID information**: Type, number, date of birth
- **Address information**: Full address with location details
- **Emergency contact**
- **Authorization settings**

### 3. **Required Documents** (`/documents`)
- **Business License**: Required document upload
- **Tax ID (NPWP)**: Required document upload
- **Company Deed**: Required document upload
- **Bank Statement**: Required document upload
- **PIC ID Card**: Required document upload
- **Additional documents**: Optional uploads
- **Document notes**

### 4. **Service Configuration** (`/services`)
- **Payment services**: Gateway, VA, E-wallet, QR Code
- **Business settings**: Model, transaction limits, currency
- **Fee structure**: Transaction, setup, monthly fees
- **Security settings**: 2FA, notifications
- **Settlement settings**: Frequency, account, auto-settlement
- **Additional settings**: Refunds, chargebacks

### 5. **Privacy & Terms** (`/privacy`)
- **Terms and Conditions**: Required acceptance
- **Privacy Policy**: Required acceptance
- **Data Processing Agreement**: Required acceptance
- **Marketing consent**: Optional
- **Analytics consent**: Optional
- **Data retention settings**

### 6. **Review & Submit** (`/notes`)
- **Application review**: Summary of all steps
- **Additional notes**: Final comments
- **Contact information**: For processing
- **Processing settings**: Priority, estimated time
- **Final confirmation**: Submit application

## 🎨 UI Components Used

### **From `/partials/common/toolbar`**
- `Toolbar`
- `ToolbarHeading`
- `ToolbarPageTitle`
- `ToolbarDescription`
- `ToolbarActions`

### **From `/components/ui`**
- `Card`, `CardContent`, `CardHeader`, `CardTitle`
- `Button`
- `Input`
- `Label`
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`
- `Textarea`
- `Switch`
- `Checkbox`
- `Badge`

### **From `/components/common`**
- `Container`

### **From `/components/image-input`**
- `ImageInput`

## 🔧 Technical Implementation

### **Form Handling**
```typescript
// Each step has its own schema
const businessInfoSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  // ... other fields
});

// Form setup with validation
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  setValue,
  watch,
} = useForm<BusinessInfoFormData>({
  resolver: zodResolver(businessInfoSchema),
});
```

### **Navigation Pattern**
```typescript
// Previous/Next buttons with proper routing
<Button variant="outline">
  <MoveLeft className="text-base" />
  <Link to="/merchant-management/merchant/create/business-info">
    Previous
  </Link>
</Button>

<Button>
  <Link to="/merchant-management/merchant/create/pic-info">
    Next: PIC Info
  </Link>
  <MoveRight className="text-base" />
</Button>
```

### **Progress Tracking**
```typescript
// Progress indicator in sidebar
<div className="w-full bg-gray-200 rounded-full h-2">
  <div 
    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
  ></div>
</div>
```

## 📱 Responsive Design

- **Mobile-first approach** with responsive grid layouts
- **Collapsible sidebar** on smaller screens
- **Touch-friendly** form elements
- **Adaptive spacing** and typography

## 🔄 State Management

### **Form State**
- Each step manages its own form state
- Data persistence between steps (to be implemented)
- Validation on step completion
- Error handling and user feedback

### **Progress State**
- Current step tracking
- Completion status per step
- Overall progress calculation
- Navigation state management

## 🚀 Usage

### **Routing Setup**
```typescript
import { merchantCreateRoutes } from './merchant-create-routing';

// Add to your main router
const router = createBrowserRouter([
  ...merchantCreateRoutes,
  // ... other routes
]);
```

### **Navigation**
```typescript
// Navigate to specific step
navigate('/merchant-management/merchant/create/business-info');

// Navigate to next step
navigate('/merchant-management/merchant/create/pic-info');
```

## 🎯 Benefits

### **User Experience**
- **Clear progression** through the application process
- **Visual feedback** on completion status
- **Organized information** collection
- **Help and guidance** at each step

### **Developer Experience**
- **Modular structure** for easy maintenance
- **Reusable components** across steps
- **Consistent patterns** for form handling
- **Clear separation** of concerns

### **Maintainability**
- **Step-specific components** for easy updates
- **Shared utilities** and hooks
- **Consistent styling** and behavior
- **Easy to extend** with new steps

## 🔮 Future Enhancements

1. **Form State Persistence**: Save form data between steps
2. **Draft Functionality**: Save and resume applications
3. **Real-time Validation**: Validate forms as user types
4. **Progress Analytics**: Track completion rates and drop-off points
5. **Mobile App**: Native mobile experience
6. **Multi-language**: Internationalization support

## 📋 Migration Notes

### **From Old Structure**
- The old `CreateMerchantContent` component is deprecated
- Individual step components are now organized by step
- Form handling is now step-specific rather than centralized
- Navigation is now URL-based rather than state-based

### **Breaking Changes**
- URL structure has changed to include step names
- Component exports have been reorganized
- Form validation is now step-specific
- Navigation logic has been updated

This new structure provides a much better user experience and is more maintainable for future development.
