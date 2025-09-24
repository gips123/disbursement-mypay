import { AuthRouting } from '@/auth/auth-routing';
import { RequireAuth } from '@/auth/require-auth';
import { ErrorRouting } from '@/errors/error-routing';
import { MasterLayout } from '@/layouts/layout';
import { DefaultPage } from '@/pages/dashboards';
import { ProfileDefaultPage } from '@/pages/public-profile';
import { Navigate, Route, Routes } from 'react-router';

import PayInPage from '@/pages/transaction-history/payin';
import PayOutPage from '@/pages/transaction-history/payout';

import BalancePage from '@/pages/balance';

import SettlementRequestPage from '@/pages/settlement/settlement-request';
import SettlementHistoryPage from '@/pages/settlement/settlement-history';

import DisbursementPage from '@/pages/send-funds/disbursement';
import AccountInquiryStatementPage from '@/pages/send-funds/account';

import {
  MerchantListPage,
  MerchantCreatePage,
  MerchantEditPage,
  MerchantDetailPage,
  MerchantReviewListPage,
  MerchantReviewPage
} from '@/pages/merchant-management/pages';

import AccountServiceListPage from '@/pages/account-service/account-list';
import PermissionsManagementPage from '@/pages/account-service/permissions';
import AccountServiceRolesManagementPage from '@/pages/account-service/roles-management';

import MyAccountListPage from '@/pages/myaccount/account-list';
import MyAccountRolesManagementPage from '@/pages/myaccount/roles-management';

import UserManagementPage from '@/pages/user-management';

export function AppRoutingSetup() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<MasterLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<DefaultPage />} />
          <Route path="/dashboard" element={<DefaultPage />} />
          
          {/* Transactions History */}
          <Route path="/transactions/pay-in" element={<PayInPage />} />
          <Route path="/transactions/pay-out" element={<PayOutPage />} />
          
          {/* Balance */}
          <Route path="/balance" element={<BalancePage />} />
          
          {/* Settlement */}
          <Route path="/settlement/request" element={<SettlementRequestPage />} />
          <Route path="/settlement/history" element={<SettlementHistoryPage />} />
          
          {/* Send Funds */}
          <Route path="/send-funds/disbursement" element={<DisbursementPage />} />
          <Route path="/send-funds/account-inquiry" element={<AccountInquiryStatementPage />} />
          
          {/* Merchant Management */}
          <Route path="/merchant-management/merchant-list" element={<MerchantListPage />} />
          <Route path="/merchant-management/merchant-create" element={<MerchantCreatePage />} />
          <Route path="/merchant-management/merchant-edit/:id" element={<MerchantEditPage />} />
          <Route path="/merchant-management/merchant-detail/:id" element={<MerchantDetailPage />} />
          <Route path="/merchant-management/merchant-review" element={<MerchantReviewListPage />} />
          <Route path="/merchant-management/merchant-review/:id" element={<MerchantReviewPage />} />
          
          {/* Legacy routes - redirect to new structure */}
          <Route path="/merchant-management/list" element={<Navigate to="/merchant-management/merchant-list" replace />} />
          <Route path="/merchant-management/review" element={<Navigate to="/merchant-management/merchant-review" replace />} />
          
          {/* Account Service */}
          <Route path="/account-service/list" element={<AccountServiceListPage />} />
          <Route path="/account-service/permissions" element={<PermissionsManagementPage />} />
          <Route path="/account-service/roles" element={<AccountServiceRolesManagementPage />} />
          
          {/* My Account */}
          <Route path="/my-account/list" element={<MyAccountListPage />} />
          <Route path="/my-account/roles" element={<MyAccountRolesManagementPage />} />
          
          {/* User Management */}
          <Route path="/user-management" element={<UserManagementPage />} />
          
          {/* Public Profile */}
          <Route
            path="/public-profile/profiles/default/"
            element={<ProfileDefaultPage />}
          />
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorRouting />} />
      <Route path="auth/*" element={<AuthRouting />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
}
