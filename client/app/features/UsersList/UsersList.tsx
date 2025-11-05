'use client';
import Button from "@/app/components/Button";
import UsersTable, { UsersTableSkeleton } from "./UsersTable";
import { Suspense} from "react";
import { useSearchParams } from "next/navigation";
import { setQueryParam } from "@/app/lib/utils";
import FilterInput from "@/app/components/FilterInput";

const UsersList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const handleSearchChange = (value: string, event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setQueryParam('search', value, 'replace');
  }

  return (
    <section className="space-y-6">
      <div className="flex gap-2">
      <FilterInput placeholder="Search by name…" handleSearchChange={handleSearchChange} defaultValue={search} autoFocus />
      <Button iconStart="plus">Add User</Button>
      </div>
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable />
      </Suspense>
    </section>
  )
}

export default UsersList;