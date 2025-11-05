import { getAllUsers } from "@/app/lib/API";
import { formatNumber } from "@/app/lib/utils";
import { User } from "@/app/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const RoleUserCount = ({ roleId }: { roleId: string }) => {
  const { data: allUsers } = useSuspenseQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
  })

  const userCount = allUsers.filter((user: User) => user.roleId === roleId).length;

  return (
    <span>{formatNumber(userCount)}</span>
  )
}

export default RoleUserCount;