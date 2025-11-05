import Avatar from '@/app/components/Avatar';
import Button from '@/app/components/Button';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/app/components/Dropdown';
import Highlight from '@/app/components/Highlight';
import Icon from '@/app/components/Icon';
import { SkeletonAvatar, SkeletonText } from '@/app/components/Skeleton';
import Table, { Cell, Row } from '@/app/components/Table';
import { deleteUser, fetchUsers, getRolesMap } from '@/app/lib/API';
import { formatDate, setQueryParam } from '@/app/lib/utils';
import { PagedData, User } from '@/app/types';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DeleteUserModal } from './DeleteUserModal';

const UsersTableHeader = () => {
  return (
    <Row>
      <Cell header>User</Cell>
      <Cell header>Role</Cell>
      <Cell className="col-span-2" header>
        Joined
      </Cell>
    </Row>
  );
};

const UsersTable = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const search = searchParams.get('search') ?? '';
  const client = useQueryClient();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => {
      return deleteUser(userId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      // toast.error('Failed to delete user');
    },
  });

  const { data: usersResponse } = useSuspenseQuery<PagedData<User>>({
    queryKey: ['users', page, search],
    queryFn: () => fetchUsers(page, search),
  });

  const { data: rolesMap } = useSuspenseQuery<Map<string, string>>({
    queryKey: ['roles'],
    queryFn: () => getRolesMap(),
  });

  const onNextPrefetch = () => {
    if (usersResponse.next) {
      client.prefetchQuery({
        queryKey: ['users', usersResponse.next, search],
        queryFn: () => fetchUsers(usersResponse.next!, search),
      });
    }
  };

  const onDeleteUser = () => {
    deleteUserMutation.mutate(userToDelete!.id);
    setUserToDelete(null);
  };

  const onPrevPrefetch = () => {
    if (usersResponse.prev) {
      client.prefetchQuery({
        queryKey: ['users', usersResponse.prev, search],
        queryFn: () => fetchUsers(usersResponse.prev!, search),
      });
    }
  };

  const onPrevClick = () => {
    if (usersResponse.prev) {
      setQueryParam('page', usersResponse.prev.toString(), 'push');
    }
  };

  const onNextClick = () => {
    if (usersResponse.next) {
      setQueryParam('page', usersResponse.next.toString(), 'push');
    }
  };

  return (
    <>
      <Table className="grid-cols-[1fr_1fr_1fr_auto]">
        <UsersTableHeader />
        {usersResponse.data.length === 0 && (
          <Row>
            <Cell className="text-muted col-span-4 justify-center">No users found</Cell>
          </Row>
        )}
        {usersResponse.data.map((user: User) => (
          <Row key={user.id}>
            <Cell>
              <Avatar src={user.photo} alt={`${user.first} ${user.last}`} />
              <span className="ml-2">
                <Highlight highlight={search}>{user.first}</Highlight>{' '}
                <Highlight highlight={search}>{user.last}</Highlight>
              </span>
            </Cell>
            <Cell>{rolesMap.get(user.roleId)}</Cell>
            <Cell>{formatDate(user.createdAt)}</Cell>
            <Cell className="text-gray-alpha-11">
              <Dropdown>
                <DropdownTrigger>
                  <Icon name="dots-horizontal" size={16} />
                </DropdownTrigger>
                <DropdownContent>
                  <DropdownItem onClick={() => {}}>Edit user</DropdownItem>
                  <DropdownItem onClick={() => setUserToDelete(user)}>Delete user</DropdownItem>
                </DropdownContent>
              </Dropdown>
            </Cell>
          </Row>
        ))}
        <Row>
          <Cell className="col-span-4 justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={usersResponse.prev === null}
              onClick={onPrevClick}
              onMouseEnter={onPrevPrefetch}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={usersResponse.next === null}
              onClick={onNextClick}
              onMouseEnter={onNextPrefetch}
            >
              Next
            </Button>
          </Cell>
        </Row>
      </Table>
      {userToDelete && (
        <DeleteUserModal
          user={userToDelete}
          onRequestClose={() => setUserToDelete(null)}
          onDeleteUser={onDeleteUser}
        />
      )}
    </>
  );
};

const UsersTableSkeletonRow = () => {
  return (
    <Row>
      <Cell className="gap-2">
        <SkeletonAvatar />
        <SkeletonText />
      </Cell>
      <Cell>
        <SkeletonText />
      </Cell>
      <Cell>
        <SkeletonText />
      </Cell>
      <Cell className="text-gray-alpha-11">
        <div className="flex size-6 items-center justify-center">
          <Icon name="dots-horizontal" size={16} />
        </div>
      </Cell>
    </Row>
  );
};

export const UsersTableSkeleton = () => {
  return (
    <Table className="grid-cols-[1fr_1fr_1fr_auto]">
      <UsersTableHeader />
      {Array.from({ length: 10 }).map((_, index) => (
        <UsersTableSkeletonRow key={index} />
      ))}
    </Table>
  );
};

export default UsersTable;
