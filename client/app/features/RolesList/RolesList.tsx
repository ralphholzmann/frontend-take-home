'use client';
import Button from '@/app/components/Button';
import { useSearchParams } from 'next/navigation';
import { setQueryParam } from '@/app/lib/utils';
import FilterInput from '@/app/components/FilterInput';
import { Suspense } from 'react';
import RolesTable, { RolesTableSkeleton } from './RolesTable';

const RolesList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const handleSearchChange = (value: string, event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setQueryParam('search', value, 'replace');
  };

  return (
    <section className="space-y-6">
      <div className="flex gap-2">
        <FilterInput
          placeholder="Search by role name…"
          handleSearchChange={handleSearchChange}
          defaultValue={search}
          autoFocus
        />
        <Button iconStart="plus">Add Role</Button>
      </div>
      <Suspense fallback={<RolesTableSkeleton />}>
        <RolesTable />
      </Suspense>
    </section>
  );
};

export default RolesList;
