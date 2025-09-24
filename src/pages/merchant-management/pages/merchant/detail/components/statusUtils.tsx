import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case 'active':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'pending':
      return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    case 'suspended':
      return <XCircle className="h-5 w-5 text-red-600" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gray-600" />;
  }
}

export function getKYCStatusIcon(status: string) {
  switch (status) {
    case 'verified':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'rejected':
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
  }
}
