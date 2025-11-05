import Button from "@/app/components/Button";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/app/components/Dropdown";
import Highlight from "@/app/components/Highlight";
import Icon from "@/app/components/Icon";
import { SkeletonText } from "@/app/components/Skeleton";
import Table, { Cell, Row } from "@/app/components/Table";
import { fetchRoles, fetchUsers, getRolesMap, patchRole } from "@/app/lib/API";
import { formatDate, setQueryParam } from "@/app/lib/utils";
import { PagedData, Role } from "@/app/types";
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import RoleUserCount from "./RoleUserCount";
import EditRoleModal from "./EditRoleModal";
// import { DeleteUserModal } from "./DeleteUserModal";

const RolesTableHeader = () => {
  return (
    <Row>
      <Cell header>Name</Cell>
      <Cell header>Description</Cell>
      <Cell header>Users</Cell>
      <Cell className="col-span-2" header>Last Updated</Cell>
    </Row>
  )
}

const RolesTable = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const search = searchParams.get('search') ?? '';
  const client = useQueryClient();
  const [roleToEdit, setRoleToEdit] = useState<Role| null>(null);
  const patchRoleMutation = useMutation({
    mutationFn: (role: Pick<Role, 'id' | 'name' | 'description' | 'isDefault'>) => {
      return patchRole(role);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: () => {
      // toast.error('Failed to edit role');
    },
  })

  const onEditRole = (role: Pick<Role, 'id' | 'name' | 'description' | 'isDefault'>) => {
    console.log('editing role', role);
    patchRoleMutation.mutate(role);
    setRoleToEdit(null);
  }

  const { data: rolesResponse } = useSuspenseQuery<PagedData<Role>>({
    queryKey: ['roles', page, search],
    queryFn: () => fetchRoles(page, search),
  })

  const { data: rolesMap } = useSuspenseQuery<Map<string, string>>({
    queryKey: ['roles'],
    queryFn: () => getRolesMap(),
  })

  const onNextPrefetch = () => {
    if (rolesResponse.next) {
      client.prefetchQuery({
        queryKey: ['users', rolesResponse.next, search],
        queryFn: () => fetchUsers(rolesResponse.next!, search),
      })
    }
  }
  

  const onPrevPrefetch = () => {
    if (rolesResponse.prev) {
      client.prefetchQuery({
        queryKey: ['users', rolesResponse.prev, search],
        queryFn: () => fetchUsers(rolesResponse.prev!, search),
      })
    }
  }

  const onPrevClick = () => {
    if (rolesResponse.prev) {
      setQueryParam("page", rolesResponse.prev.toString(), 'push');
    }
  }

  const onNextClick = () => {
    if (rolesResponse.next) {
      setQueryParam("page", rolesResponse.next.toString(), 'push');
    }
  }

  return (
    <>
      <Table className="grid-cols-[2fr_3fr_1fr_1fr_auto]">
        <RolesTableHeader />
        {rolesResponse.data.length === 0 && (
          <Row>
            <Cell className="col-span-4 justify-center text-muted">No users found</Cell>
          </Row>
        )}
        {rolesResponse.data.map((role: Role) => (
          <Row key={role.id}>
            <Cell className="gap-1">
              {role.isDefault &&(
                <span title="Default role">
                <Icon className="text-purple-9" name="star" size={16} />
                </span>
              )}
              <Highlight highlight={search}>{role.name}</Highlight>
            </Cell>
            <Cell>
              <Highlight highlight={search}>{role.description}</Highlight>
            </Cell>
            <Cell>
              <Suspense fallback={<SkeletonText />}>
                <RoleUserCount roleId={role.id} />
              </Suspense>
            </Cell>
            <Cell>{formatDate(role.updatedAt || role.createdAt)}</Cell>
            <Cell className="text-gray-alpha-11">
              <Dropdown>
                <DropdownTrigger>
                  <Icon name="dots-horizontal" size={16} />
                </DropdownTrigger>
                <DropdownContent>
                  <DropdownItem onClick={() => setRoleToEdit(role)}>Edit role</DropdownItem>
                  <DropdownItem onClick={() => {}}>Delete role</DropdownItem>
                </DropdownContent>
              </Dropdown>
            </Cell>
          </Row>
        ))}
        <Row>
          <Cell className="col-span-5 justify-end gap-2">
            <Button variant="secondary" size="sm" disabled={rolesResponse.prev === null} onClick={onPrevClick} onMouseEnter={onPrevPrefetch}>Previous</Button>
            <Button variant="secondary" size="sm" disabled={rolesResponse.next === null} onClick={onNextClick} onMouseEnter={onNextPrefetch}>Next</Button>
          </Cell>
        </Row>
      </Table>
      {roleToEdit && <EditRoleModal role={roleToEdit} onRequestClose={() => setRoleToEdit(null)} onEditRole={onEditRole} />}
    </>
  )
}

const RolesTableSkeletonRow = () => {
  return (
    <Row>
      <Cell>
        <SkeletonText /></Cell>
      <Cell><SkeletonText /></Cell>
      <Cell><SkeletonText /></Cell>
      <Cell><SkeletonText /></Cell>
      <Cell className="text-gray-alpha-11">
        <div className="size-6 flex items-center justify-center">
          <Icon name="dots-horizontal" size={16}/>
        </div>
      </Cell>
    </Row>
  )
}

export const RolesTableSkeleton = () => {
  return (
    <Table className="grid-cols-[1fr_auto_1fr_1fr_auto]">
      <RolesTableHeader />
      {Array.from({ length: 10 }).map((_, index) => (
        <RolesTableSkeletonRow key={index} />
      ))}
    </Table>
  )
}

export default RolesTable;