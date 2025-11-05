import { Role } from '../types';

const fetchUsers = async (page: number, search?: string) => {
  const url = new URL('http://localhost:3002/users');
  url.searchParams.set('page', page.toString());
  if (search) {
    url.searchParams.set('search', search);
  }
  const response = await fetch(url.toString());
  return response.json();
};

const fetchRoles = async (page: number = 1, search?: string) => {
  const url = new URL('http://localhost:3002/roles');
  url.searchParams.set('page', page.toString());
  if (search) {
    url.searchParams.set('search', search);
  }
  const response = await fetch(url.toString());
  return response.json();
};

const getRolesMap = async (memo: Role[] = [], page: number = 1) => {
  const response = await fetchRoles(page);

  memo.push(...response.data);

  if (response.next) {
    return getRolesMap(memo, response.next);
  }

  return new Map(memo.map((role: Role) => [role.id, role.name]));
};

const getAllUsers = async (memo: User[] = [], page: number = 1) => {
  const response = await fetchUsers(page);
  memo.push(...response.data);
  if (response.next) {
    return getAllUsers(memo, response.next);
  }
  return memo;
};

const patchRole = async (role: Pick<Role, 'id' | 'name' | 'description' | 'isDefault'>) => {
  const response = await fetch(`http://localhost:3002/roles/${role.id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(role),
  });
  return response.json();
};

const deleteUser = async (userId: string) => {
  const response = await fetch(`http://localhost:3002/users/${userId}`, {
    method: 'DELETE',
  });
  return response.json();
};

export { fetchUsers, fetchRoles, getRolesMap, deleteUser, getAllUsers, patchRole };
