import axios from 'axios';
import {
  Merchant,
  MerchantListItem,
  MerchantListResponse,
  CreateMerchantRequest,
  UpdateMerchantRequest,
  MerchantFilters,
  MerchantSortOptions,
  ApiResponse,
  MerchantReview,
} from './merchant.model';

// API Base Configuration
const API_BASE_URL = '/api/merchant-management';
const TIMEOUT = 10000; // 10 seconds

// Create axios instance with default config
const merchantApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
merchantApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
merchantApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      localStorage.removeItem('auth_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Merchant API Methods
export class MerchantAPI {
  /**
   * Get paginated list of merchants with filters and sorting
   */
  static async getMerchants(params?: {
    page?: number;
    limit?: number;
    filters?: MerchantFilters;
    sort?: MerchantSortOptions;
  }): Promise<MerchantListResponse> {
    const response = await merchantApi.get<MerchantListResponse>('/merchants', {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        ...params?.filters,
        sortField: params?.sort?.field,
        sortDirection: params?.sort?.direction,
      },
    });
    return response.data;
  }

  /**
   * Get merchant by ID with full details
   */
  static async getMerchantById(id: string): Promise<ApiResponse<Merchant>> {
    const response = await merchantApi.get<ApiResponse<Merchant>>(`/merchants/${id}`);
    return response.data;
  }

  /**
   * Create new merchant
   */
  static async createMerchant(data: CreateMerchantRequest): Promise<ApiResponse<Merchant>> {
    const response = await merchantApi.post<ApiResponse<Merchant>>('/merchants', data);
    return response.data;
  }

  /**
   * Update merchant information
   */
  static async updateMerchant(data: UpdateMerchantRequest): Promise<ApiResponse<Merchant>> {
    const response = await merchantApi.put<ApiResponse<Merchant>>(`/merchants/${data.id}`, data);
    return response.data;
  }

  /**
   * Delete merchant (soft delete)
   */
  static async deleteMerchant(id: string): Promise<ApiResponse<void>> {
    const response = await merchantApi.delete<ApiResponse<void>>(`/merchants/${id}`);
    return response.data;
  }

  /**
   * Activate merchant
   */
  static async activateMerchant(id: string, reason?: string): Promise<ApiResponse<Merchant>> {
    const response = await merchantApi.post<ApiResponse<Merchant>>(`/merchants/${id}/activate`, {
      reason,
    });
    return response.data;
  }

  /**
   * Suspend merchant
   */
  static async suspendMerchant(id: string, reason: string): Promise<ApiResponse<Merchant>> {
    const response = await merchantApi.post<ApiResponse<Merchant>>(`/merchants/${id}/suspend`, {
      reason,
    });
    return response.data;
  }

  /**
   * Get merchant statistics
   */
  static async getMerchantStats(filters?: {
    dateRange?: {
      from: string;
      to: string;
    };
  }): Promise<ApiResponse<any>> {
    const response = await merchantApi.get<ApiResponse<any>>('/merchants/stats', {
      params: filters,
    });
    return response.data;
  }

  /**
   * Upload merchant document
   */
  static async uploadDocument(
    merchantId: string,
    file: File,
    documentType: string
  ): Promise<ApiResponse<{ url: string; documentId: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    const response = await merchantApi.post<ApiResponse<{ url: string; documentId: string }>>(
      `/merchants/${merchantId}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  /**
   * Get merchant activity log
   */
  static async getActivityLog(
    merchantId: string,
    params?: {
      page?: number;
      limit?: number;
      dateRange?: {
        from: string;
        to: string;
      };
    }
  ): Promise<ApiResponse<any[]>> {
    const response = await merchantApi.get<ApiResponse<any[]>>(
      `/merchants/${merchantId}/activity-log`,
      {
        params,
      }
    );
    return response.data;
  }

  /**
   * Verify merchant KYC
   */
  static async verifyKYC(
    merchantId: string,
    status: 'verified' | 'rejected',
    notes?: string
  ): Promise<ApiResponse<Merchant>> {
    const response = await merchantApi.post<ApiResponse<Merchant>>(
      `/merchants/${merchantId}/kyc/verify`,
      {
        status,
        notes,
      }
    );
    return response.data;
  }

  /**
   * Export merchants data
   */
  static async exportMerchants(
    format: 'csv' | 'excel',
    filters?: MerchantFilters
  ): Promise<Blob> {
    const response = await merchantApi.get('/merchants/export', {
      params: {
        format,
        ...filters,
      },
      responseType: 'blob',
    });
    return response.data;
  }

  /**
   * Get merchant review queue (for approvers)
   */
  static async getReviewQueue(params?: {
    page?: number;
    limit?: number;
    status?: 'pending' | 'approved' | 'rejected';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
  }): Promise<ApiResponse<MerchantReview[]>> {
    const response = await merchantApi.get<ApiResponse<MerchantReview[]>>('/reviews', {
      params,
    });
    return response.data;
  }

  /**
   * Get review details
   */
  static async getReviewById(id: string): Promise<ApiResponse<MerchantReview>> {
    const response = await merchantApi.get<ApiResponse<MerchantReview>>(`/reviews/${id}`);
    return response.data;
  }

  /**
   * Approve merchant review
   */
  static async approveReview(
    id: string,
    comments?: string
  ): Promise<ApiResponse<MerchantReview>> {
    const response = await merchantApi.post<ApiResponse<MerchantReview>>(`/reviews/${id}/approve`, {
      comments,
    });
    return response.data;
  }

  /**
   * Reject merchant review
   */
  static async rejectReview(
    id: string,
    comments: string
  ): Promise<ApiResponse<MerchantReview>> {
    const response = await merchantApi.post<ApiResponse<MerchantReview>>(`/reviews/${id}/reject`, {
      comments,
    });
    return response.data;
  }

  /**
   * Search merchants (for autocomplete/quick search)
   */
  static async searchMerchants(query: string): Promise<ApiResponse<MerchantListItem[]>> {
    const response = await merchantApi.get<ApiResponse<MerchantListItem[]>>('/merchants/search', {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * Get merchant transactions summary
   */
  static async getMerchantTransactions(
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
  ): Promise<ApiResponse<any[]>> {
    const response = await merchantApi.get<ApiResponse<any[]>>(
      `/merchants/${merchantId}/transactions`,
      {
        params,
      }
    );
    return response.data;
  }

  /**
   * Update merchant settings
   */
  static async updateMerchantSettings(
    merchantId: string,
    settings: any
  ): Promise<ApiResponse<Merchant>> {
    const response = await merchantApi.patch<ApiResponse<Merchant>>(
      `/merchants/${merchantId}/settings`,
      settings
    );
    return response.data;
  }

  /**
   * Bulk operations on merchants
   */
  static async bulkOperation(
    operation: 'activate' | 'suspend' | 'delete',
    merchantIds: string[],
    reason?: string
  ): Promise<ApiResponse<{ success: string[]; failed: string[] }>> {
    const response = await merchantApi.post<ApiResponse<{ success: string[]; failed: string[] }>>(
      '/merchants/bulk',
      {
        operation,
        merchantIds,
        reason,
      }
    );
    return response.data;
  }
}

// Export default instance
export default MerchantAPI;
