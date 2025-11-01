import Button from "@/app/components/Button";
import SearchInput from "./SearchInput";
import Input from "@/app/components/Input";

const UsersList = () => {
  return (
    <form className="flex gap-2">
      <Input placeholder="Search by name…" startIcon="magnifying-glass" className="grow" />
      <Button>Add User</Button>
    </form>
  )
}

export default UsersList;