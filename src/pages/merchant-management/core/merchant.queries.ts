import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { MerchantAPI } from './merchant.api';
import {
  MerchantListResponse,
  CreateMerchantRequest,
  UpdateMerchantRequest,
  MerchantFilters,
  MerchantSortOptions,
} from './merchant.model';

// Query Keys
export const merchantQueryKeys = {
  all: ['merchants'] as const,
  lists: () => [...merchantQueryKeys.all, 'list'] as const,
  list: (filters?: MerchantFilters, sort?: MerchantSortOptions, page?: number, limit?: number) =>
    [...merchantQueryKeys.lists(), { filters, sort, page, limit }] as const,
  details: () => [...merchantQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...merchantQueryKeys.details(), id] as const,
  stats: () => [...merchantQueryKeys.all, 'stats'] as const,
  activityLog: (merchantId: string) => [...merchantQueryKeys.all, 'activity-log', merchantId] as const,
  reviews: () => [...merchantQueryKeys.all, 'reviews'] as const,
  review: (id: string) => [...merchantQueryKeys.reviews(), id] as const,
  transactions: (merchantId: string) => [...merchantQueryKeys.all, 'transactions', merchantId] as const,
};

// Hook: Get merchants list with pagination, filters, and sorting
export function useMerchantList(params?: {
  page?: number;
  limit?: number;
  filters?: MerchantFilters;
  sort?: MerchantSortOptions;
  enabled?: boolean;
}) {
  return useQuery<MerchantListResponse>({
    queryKey: merchantQueryKeys.list(params?.filters, params?.sort, params?.page, params?.limit),
    queryFn: () => MerchantAPI.getMerchants(params),
    enabled: params?.enabled ?? true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

// Hook: Get merchant details
export function useMerchantDetail(
  merchantId: string,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: merchantQueryKeys.detail(merchantId),
    queryFn: () => MerchantAPI.getMerchantById(merchantId),
    enabled: !!merchantId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}

// Hook: Get merchant statistics
export function useMerchantStats(filters?: {
  dateRange?: {
    from: string;
    to: string;
  };
}) {
  return useQuery({
    queryKey: [...merchantQueryKeys.stats(), filters],
    queryFn: () => MerchantAPI.getMerchantStats(filters),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

// Hook: Get merchant activity log
export function useMerchantActivityLog(
  merchantId: string,
  params?: {
    page?: number;
    limit?: number;
    dateRange?: {
      from: string;
      to: string;
    };
  }
) {
  return useQuery({
    queryKey: [...merchantQueryKeys.activityLog(merchantId), params],
    queryFn: () => MerchantAPI.getActivityLog(merchantId, params),
    enabled: !!merchantId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook: Get merchant transactions
export function useMerchantTransactions(
  merchantId: string,
  params?: {
    page?: number;
    limit?: number;
    dateRange?: {
      from: string;
      to: string;
    };
    status?: string;
  }
) {
  return useQuery({
    queryKey: [...merchantQueryKeys.transactions(merchantId), params],
    queryFn: () => MerchantAPI.getMerchantTransactions(merchantId, params),
    enabled: !!merchantId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook: Get review queue (for approvers)
export function useReviewQueue(params?: {
  page?: number;
  limit?: number;
  status?: 'pending' | 'approved' | 'rejected';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}) {
  return useQuery({
    queryKey: [...merchantQueryKeys.reviews(), params],
    queryFn: () => MerchantAPI.getReviewQueue(params),
    staleTime: 1000 * 60 * 2, // 2 minutes (reviews need frequent updates)
  });
}

// Hook: Get review details
export function useReviewDetail(reviewId: string) {
  return useQuery({
    queryKey: merchantQueryKeys.review(reviewId),
    queryFn: () => MerchantAPI.getReviewById(reviewId),
    enabled: !!reviewId,
  });
}

// Hook: Search merchants (for autocomplete)
export function useSearchMerchants(query: string, enabled = true) {
  return useQuery({
    queryKey: [...merchantQueryKeys.all, 'search', query],
    queryFn: () => MerchantAPI.searchMerchants(query),
    enabled: enabled && query.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Mutation: Create merchant
export function useCreateMerchant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMerchantRequest) => MerchantAPI.createMerchant(data),
    onSuccess: () => {
      // Invalidate and refetch merchant list
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.stats() });
      
      toast.success('Merchant created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create merchant');
    },
  });
}

// Mutation: Update merchant
export function useUpdateMerchant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMerchantRequest) => MerchantAPI.updateMerchant(data),
    onSuccess: (data, variables) => {
      // Update specific merchant in cache
      queryClient.setQueryData(
        merchantQueryKeys.detail(variables.id),
        data
      );
      
      // Invalidate lists to reflect changes
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.lists() });
      
      toast.success('Merchant updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update merchant');
    },
  });
}

// Mutation: Delete merchant
export function useDeleteMerchant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (merchantId: string) => MerchantAPI.deleteMerchant(merchantId),
    onSuccess: (_, merchantId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: merchantQueryKeys.detail(merchantId) });
      
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.stats() });
      
      toast.success('Merchant deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete merchant');
    },
  });
}

// Mutation: Activate merchant
export function useActivateMerchant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ merchantId, reason }: { merchantId: string; reason?: string }) =>
      MerchantAPI.activateMerchant(merchantId, reason),
    onSuccess: (data, { merchantId }) => {
      // Update merchant in cache
      queryClient.setQueryData(merchantQueryKeys.detail(merchantId), data);
      
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.lists() });
      
      toast.success('Merchant activated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to activate merchant');
    },
  });
}

// Mutation: Suspend merchant
export function useSuspendMerchant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ merchantId, reason }: { merchantId: string; reason: string }) =>
      MerchantAPI.suspendMerchant(merchantId, reason),
    onSuccess: (data, { merchantId }) => {
      // Update merchant in cache
      queryClient.setQueryData(merchantQueryKeys.detail(merchantId), data);
      
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.lists() });
      
      toast.success('Merchant suspended successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to suspend merchant');
    },
  });
}

// Mutation: Verify KYC
export function useVerifyKYC() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      merchantId,
      status,
      notes,
    }: {
      merchantId: string;
      status: 'verified' | 'rejected';
      notes?: string;
    }) => MerchantAPI.verifyKYC(merchantId, status, notes),
    onSuccess: (data, { merchantId }) => {
      // Update merchant in cache
      queryClient.setQueryData(merchantQueryKeys.detail(merchantId), data);
      
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.lists() });
      
      toast.success(`KYC ${data.data.compliance.kycStatus} successfully`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to verify KYC');
    },
  });
}

// Mutation: Upload document
export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      merchantId,
      file,
      documentType,
    }: {
      merchantId: string;
      file: File;
      documentType: string;
    }) => MerchantAPI.uploadDocument(merchantId, file, documentType),
    onSuccess: (_, { merchantId }) => {
      // Invalidate merchant detail to refresh documents
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.detail(merchantId) });
      
      toast.success('Document uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upload document');
    },
  });
}

// Mutation: Approve review
export function useApproveReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, comments }: { reviewId: string; comments?: string }) =>
      MerchantAPI.approveReview(reviewId, comments),
    onSuccess: (_, { reviewId }) => {
      // Update review in cache
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.review(reviewId) });
      
      // Invalidate review list
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.reviews() });
      
      // Invalidate merchant list in case status changed
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.lists() });
      
      toast.success('Review approved successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to approve review');
    },
  });
}

// Mutation: Reject review
export function useRejectReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, comments }: { reviewId: string; comments: string }) =>
      MerchantAPI.rejectReview(reviewId, comments),
    onSuccess: (_, { reviewId }) => {
      // Update review in cache
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.review(reviewId) });
      
      // Invalidate review list
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.reviews() });
      
      toast.success('Review rejected');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to reject review');
    },
  });
}

// Mutation: Bulk operations
export function useBulkOperation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      operation,
      merchantIds,
      reason,
    }: {
      operation: 'activate' | 'suspend' | 'delete';
      merchantIds: string[];
      reason?: string;
    }) => MerchantAPI.bulkOperation(operation, merchantIds, reason),
    onSuccess: (data, { operation }) => {
      // Invalidate all merchant queries
      queryClient.invalidateQueries({ queryKey: merchantQueryKeys.all });
      
      const { success, failed } = data.data;
      const successCount = success.length;
      const failedCount = failed.length;
      
      if (successCount > 0) {
        toast.success(`${operation} completed for ${successCount} merchant${successCount > 1 ? 's' : ''}`);
      }
      
      if (failedCount > 0) {
        toast.error(`Failed to ${operation} ${failedCount} merchant${failedCount > 1 ? 's' : ''}`);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Bulk operation failed');
    },
  });
}
