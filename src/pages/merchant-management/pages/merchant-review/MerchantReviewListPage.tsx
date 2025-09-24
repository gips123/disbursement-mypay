import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { MerchantHeader } from '../../components';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockData } from '../../mocks/merchant.mock';
import { formatRelativeTime } from '../../utils/merchant.helper';
import type { MerchantReview } from '../../core/merchant.model';

export function MerchantReviewListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // For demo purposes, using mock data. In production, use the actual queries
  const reviewsData = mockData.reviews;

  // Filter reviews based on current filters
  const filteredReviews = reviewsData.filter(review => {
    const merchantName = review.merchant.companyName || review.merchant.merchant?.name || '';
    const merchantEmail = review.merchant.contact?.email || '';
    const matchesSearch = !searchQuery || 
      merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchantEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesType = typeFilter === 'all' || review.reviewType === typeFilter;
    const matchesPriority = priorityFilter === 'all' || review.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'destructive';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const handleQuickAction = (action: string, review: MerchantReview) => {
    const merchantName = review.merchant.companyName || review.merchant.merchant?.name || 'Unknown Merchant';
    switch (action) {
      case 'approve':
        toast.success(`${merchantName} approved`);
        break;
      case 'reject':
        toast.success(`${merchantName} rejected`);
        break;
      case 'view':
        navigate(`/merchant-management/merchant-review/${review.id}`);
        break;
      default:
        break;
    }
  };

  // Table columns configuration
  const columns = [
    {
      key: 'merchant',
      label: 'Merchant',
      sortable: true,
      render: (review: MerchantReview) => (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <img
              src={review.merchant.merchant?.logo || '/media/avatars/300-1.jpg'}
              alt=""
              className="size-10 rounded-lg object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {review.merchant.companyName || review.merchant.merchant?.name || 'Unknown Merchant'}
            </div>
            <div className="text-sm text-gray-600">
              {review.merchant.merchant?.businessType || 'Unknown Business Type'}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Review Type',
      sortable: true,
      render: (review: MerchantReview) => (
        <div>
          <span className="font-medium capitalize">{review.reviewType.replace('-', ' ')}</span>
          <div className="text-sm text-gray-600">
            by {review.requestedBy}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (review: MerchantReview) => (
        <Badge 
          variant={getStatusBadgeVariant(review.status)} 
          className="gap-1"
        >
          {getStatusIcon(review.status)}
          {review.status}
        </Badge>
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (review: MerchantReview) => (
        <Badge variant={getPriorityBadgeVariant(review.priority)} className="capitalize">
          {review.priority}
        </Badge>
      ),
    },
    {
      key: 'requestDate',
      label: 'Requested',
      sortable: true,
      render: (review: MerchantReview) => (
        <div className="text-sm">
          <div className="text-gray-900">
            {formatRelativeTime(review.requestDate)}
          </div>
          <div className="text-gray-600">
            {new Date(review.requestDate).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (review: MerchantReview) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/merchant-management/merchant-review/${review.id}`)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            Review
          </Button>
          
          {review.status === 'pending' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleQuickAction('approve', review)}
                  className="gap-2"
                >
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Quick Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleQuickAction('reject', review)}
                  className="gap-2"
                >
                  <XCircle className="h-4 w-4 text-red-600" />
                  Quick Reject
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ),
    },
  ];

  // Stats cards data
  const stats = [
    {
      label: 'Total Reviews',
      value: reviewsData.length,
      icon: Clock,
      color: 'text-blue-600',
    },
    {
      label: 'Pending',
      value: reviewsData.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      label: 'Approved',
      value: reviewsData.filter(r => r.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      label: 'Rejected',
      value: reviewsData.filter(r => r.status === 'rejected').length,
      icon: XCircle,
      color: 'text-red-600',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <MerchantHeader
        title="Merchant Review Queue"
        subtitle="Review and approve merchant registration and modification requests"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by merchant name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="creation">Creation</SelectItem>
                <SelectItem value="modification">Modification</SelectItem>
                <SelectItem value="reactivation">Reactivation</SelectItem>
                <SelectItem value="suspension">Suspension</SelectItem>
              </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Review Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <Clock className="h-12 w-12 text-gray-300" />
                        <div>
                          <h3 className="font-medium text-gray-900">No reviews found</h3>
                          <p className="text-gray-600">There are no merchant reviews matching your criteria.</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReviews.map((review) => (
                    <TableRow key={review.id} className="hover:bg-gray-50">
                      <TableCell>
                        {columns[0].render(review)}
                      </TableCell>
                      <TableCell>
                        {columns[1].render(review)}
                      </TableCell>
                      <TableCell>
                        {columns[2].render(review)}
                      </TableCell>
                      <TableCell>
                        {columns[3].render(review)}
                      </TableCell>
                      <TableCell>
                        {columns[4].render(review)}
                      </TableCell>
                      <TableCell className="text-right">
                        {columns[5].render(review)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MerchantReviewListPage;
