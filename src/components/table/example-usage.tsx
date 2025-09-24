'use client';

import { Link } from 'react-router-dom';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { ReusableTable, TableColumn, TableAction } from '@/components/table';

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
    color:
      | 'secondary'
      | 'primary'
      | 'destructive'
      | 'success'
      | 'info'
      | 'warning'
      | null
      | undefined;
  };
  location: string;
  flag: string;
  activity: string;
}

// Sample data - dalam implementasi nyata, ini akan datang dari API/props
const userData: IUserData[] = [
  {
    id: '1',
    user: {
      avatar: '300-1.png',
      userName: 'Esther Howard',
      userGmail: 'esther.howard@gmail.com',
    },
    role: 'Editor',
    status: {
      label: 'On Leave',
      color: 'destructive',
    },
    location: 'Malaysia',
    flag: 'malaysia.svg',
    activity: 'Week ago',
  },
  {
    id: '2',
    user: {
      avatar: '300-2.png',
      userName: 'Cody Fisher',
      userGmail: 'cody.fisher@gmail.com',
    },
    role: 'Manager',
    status: {
      label: 'Remote',
      color: 'primary',
    },
    location: 'Canada',
    flag: 'canada.svg',
    activity: 'Current session',
  },
  {
    id: '3',
    user: {
      avatar: '300-3.png',
      userName: 'Tyler Hero',
      userGmail: 'tyler.hero@gmail.com',
    },
    role: 'Super Admin',
    status: {
      label: 'In Office',
      color: 'success',
    },
    location: 'Estonia',
    flag: 'estonia.svg',
    activity: 'Current session',
  },
  // ... (rest of the data would be here)
];

const Users = () => {
  const { copyToClipboard } = useCopyToClipboard();

  // Define table columns
  const columns: TableColumn<IUserData>[] = [
    {
      id: 'users',
      accessorFn: (row) => row.user,
      header: 'Member',
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <img
            src={toAbsoluteUrl(`/media/avatars/${row.original.user.avatar}`)}
            className="rounded-full size-9 shrink-0"
            alt={`${row.original.user.userName}`}
          />
          <div className="flex flex-col gap-0.5">
            <Link
              to="#"
              className="text-sm font-medium text-mono hover:text-primary-active mb-px"
            >
              {row.original.user.userName}
            </Link>
            <Link
              to="#"
              className="text-sm text-secondary-foreground font-normal hover:text-primary-active"
            >
              {row.original.user.userGmail}
            </Link>
          </div>
        </div>
      ),
      enableSorting: true,
      size: 300,
    },
    {
      id: 'role',
      accessorFn: (row) => row.role,
      header: 'Role',
      cell: ({ row }) => (
        <span className="text-foreground font-normal">
          {row.original.role}
        </span>
      ),
      enableSorting: true,
      size: 180,
    },
    {
      id: 'status',
      accessorFn: (row) => row.status,
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          size="lg"
          variant={row.original.status.color}
          appearance="light"
          shape="circle"
        >
          <BadgeDot className={`${row.original.status.color}`} />
          {row.original.status.label}
        </Badge>
      ),
      enableSorting: true,
      size: 180,
    },
    {
      id: 'location',
      accessorFn: (row) => row.location,
      header: 'Location',
      cell: ({ row }) => (
        <div className="flex items-center text-foreground font-normal gap-1.5">
          <img
            src={toAbsoluteUrl(`/media/flags/${row.original.flag}`)}
            className="rounded-full size-4 shrink-0"
            alt={`${row.original.user.userName}`}
          />
          {row.original.location}
        </div>
      ),
      enableSorting: true,
      size: 180,
    },
    {
      id: 'activity',
      accessorFn: (row) => row.activity,
      header: 'Activity',
      cell: ({ row }) => (
        <span className="text-foreground font-normal">
          {row.original.activity}
        </span>
      ),
      enableSorting: true,
      size: 180,
    },
  ];

  // Define table actions
  const actions: TableAction<IUserData>[] = [
    {
      label: 'Edit',
      onClick: (user) => {
        console.log('Edit user:', user);
        // Handle edit action
      },
    },
    {
      label: 'Copy ID',
      onClick: (user) => {
        copyToClipboard(String(user.id));
        const message = `User ID successfully copied: ${user.id}`;
        toast.custom(
          (t) => (
            <Alert
              variant="mono"
              icon="success"
              close={false}
              onClose={() => toast.dismiss(t)}
            >
              <AlertIcon>
                <RiCheckboxCircleFill />
              </AlertIcon>
              <AlertTitle>{message}</AlertTitle>
            </Alert>
          ),
          {
            position: 'top-center',
          }
        );
      },
    },
    {
      label: 'Delete',
      onClick: (user) => {
        console.log('Delete user:', user);
        // Handle delete action
      },
      variant: 'destructive',
    },
  ];

  // Define filter options
  const filterOptions = [
    { label: 'On Leave', value: 'On Leave' },
    { label: 'Remote', value: 'Remote' },
    { label: 'In Office', value: 'In Office' },
  ];

  // Define sort options
  const sortOptions = [
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Older', value: 'older' },
  ];

  return (
    <ReusableTable
      data={userData}
      columns={columns}
      actions={actions}
      searchable={true}
      searchPlaceholder="Search Users..."
      searchFields={['user', 'role', 'location', 'activity']}
      filterable={true}
      filterOptions={filterOptions}
      filterLabel="Status"
      sortable={true}
      sortOptions={sortOptions}
      selectable={true}
      pagination={{
        pageSize: 10,
        pageSizeOptions: [5, 10, 20, 50],
      }}
      onRowClick={(user) => {
        console.log('Row clicked:', user);
      }}
    />
  );
};

export { Users };
