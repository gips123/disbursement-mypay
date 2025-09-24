// Mock API handlers for merchant management (without MSW dependency)
import { mockData } from './merchant.mock';

// Mock API responses for development/testing
export const merchantAPIResponses = {
  // GET /merchants - List merchants with pagination and filters
  getMerchants: (params?: any) => {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = '',
      businessType = '',
      country = '',
      sortField = '',
      sortDirection = 'asc'
    } = params || {};

    let merchants = [...mockData.merchants];

    // Apply filters
    if (search) {
      merchants = merchants.filter(m => {
        const name = m.companyName || m.merchant?.name || '';
        const email = m.contact?.email || '';
        const city = m.location?.city || '';
        return name.toLowerCase().includes(search.toLowerCase()) ||
               email.toLowerCase().includes(search.toLowerCase()) ||
               city.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (status) {
      merchants = merchants.filter(m => {
        const merchantStatus = m.productionStatus?.label || m.status?.label || '';
        return merchantStatus.toLowerCase() === status.toLowerCase();
      });
    }

    if (businessType) {
      merchants = merchants.filter(m => {
        const businessTypeValue = m.merchant?.businessType || '';
        return businessTypeValue.toLowerCase() === businessType.toLowerCase();
      });
    }

    if (country) {
      merchants = merchants.filter(m => {
        const countryValue = m.location?.country || '';
        return countryValue.toLowerCase() === country.toLowerCase();
      });
    }

    // Apply sorting
    if (sortField) {
      merchants.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (sortField) {
          case 'name':
            aValue = (a.companyName || a.merchant?.name || '').toLowerCase();
            bValue = (b.companyName || b.merchant?.name || '').toLowerCase();
            break;
          case 'registrationDate':
            aValue = new Date(a.registeredDate || a.registrationDate || '2024-01-01');
            bValue = new Date(b.registeredDate || b.registrationDate || '2024-01-01');
            break;
          case 'monthlyVolume':
            aValue = a.monthlyVolume || 0;
            bValue = b.monthlyVolume || 0;
            break;
          case 'lastActivity':
            aValue = a.lastActivity;
            bValue = b.lastActivity;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Apply pagination
    const total = merchants.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMerchants = merchants.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedMerchants,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      stats: mockData.stats,
    };
  },

  // GET /merchants/:id - Get merchant details
  getMerchantById: (id: string) => {
    try {
      const merchant = mockData.getMerchantDetail(id);
      return {
        success: true,
        data: merchant,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Merchant not found',
      };
    }
  },

  // GET /reviews - Get review queue
  getReviews: (params?: any) => {
    const {
      page = 1,
      limit = 10,
      status = '',
      priority = ''
    } = params || {};

    let reviews = [...mockData.reviews];

    // Apply filters
    if (status) {
      reviews = reviews.filter(r => r.status === status);
    }

    if (priority) {
      reviews = reviews.filter(r => r.priority === priority);
    }

    // Apply pagination
    const total = reviews.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReviews = reviews.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedReviews,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },

  // GET /reviews/:id - Get review details
  getReviewById: (id: string) => {
    const review = mockData.reviews.find(r => r.id === id);
    
    if (!review) {
      return {
        success: false,
        message: 'Review not found',
      };
    }

    return {
      success: true,
      data: review,
    };
  },

  // GET /merchants/stats - Get merchant statistics
  getStats: () => {
    return {
      success: true,
      data: mockData.stats,
    };
  },

  // GET /merchants/search - Search merchants
  searchMerchants: (query: string) => {
    const results = mockData.merchants.filter(m => {
      const name = m.companyName || m.merchant?.name || '';
      const email = m.contact?.email || '';
      return name.toLowerCase().includes(query.toLowerCase()) ||
             email.toLowerCase().includes(query.toLowerCase());
    }).slice(0, 10); // Limit to 10 results

    return {
      success: true,
      data: results,
    };
  },
};

export default merchantAPIResponses;
