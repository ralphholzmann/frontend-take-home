import { Role } from '../types';

const BASE_URL = 'http://localhost:3002';

type ExpectedErrorBody = {
  message: string;
};

const makeRequest = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    let errorBody;
    try {
      errorBody = (await response.json()) as ExpectedErrorBody;
    } catch {
      throw new Error('Failed to make request. Please try again.');
    }
    throw new Error(errorBody.message);
  }

  return response.json();
};

const fetchUsers = async (page: number, search?: string) => {
  const url = new URL(`${BASE_URL}/users`);
  url.searchParams.set('page', page.toString());
  if (search) {
    url.searchParams.set('search', search);
  }
  return makeRequest(url.toString());
};

const fetchRoles = async (page: number = 1, search?: string) => {
  const url = new URL(`${BASE_URL}/roles`);
  url.searchParams.set('page', page.toString());
  if (search) {
    url.searchParams.set('search', search);
  }
  return makeRequest(url.toString());
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
  const url = new URL(`${BASE_URL}/roles/${role.id}`);
  return makeRequest(url.toString(), {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(role),
  });
};

const deleteUser = async (userId: string) => {
  const url = new URL(`${BASE_URL}/users/${userId}`);
  return makeRequest(url.toString(), {
    method: 'DELETE',
  });
};

export { fetchUsers, fetchRoles, getRolesMap, deleteUser, getAllUsers, patchRole };
