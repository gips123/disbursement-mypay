// Main merchant module exports with specific naming to avoid conflicts

// Pages
export { MerchantListPage } from './list';
export { MerchantCreatePage } from './create';
export { MerchantDetailPage } from './detail';
export { MerchantEditPage } from './edit';

// Hooks with page-specific names
export { 
  useMerchantList as useMerchantListPage,
  useMerchantListActions 
} from './list';

export { 
  useCreateMerchantPage 
} from './create';

export { 
  useMerchantDetail as useMerchantDetailPage 
} from './detail';

export { 
  useEditMerchantPage 
} from './edit';

// Components from each module
export {
  MerchantListTable,
  MerchantListDialogs
} from './list';

export {
  CreateMerchantForm
} from './create';

export {
  MerchantDetailTabs,
  MerchantStatusCards,
  MerchantOverview,
  MerchantCompliance as MerchantComplianceTab,
  MerchantFinancial as MerchantFinancialTab
} from './detail';

export {
  EditMerchantForm
} from './edit';
