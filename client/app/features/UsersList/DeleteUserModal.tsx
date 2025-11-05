import Button from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { User } from "@/app/types";

type DeleteUserModalProps = {
  user: User
  onRequestClose: () => void;
  onDeleteUser: () => void;
}

const DeleteUserModal = ({ user, onRequestClose, onDeleteUser }: DeleteUserModalProps) => {
  return (
    <Modal onRequestClose={onRequestClose}>
      <div className="space-y-3 mb-4 text-grays-12">
        <h5 className="text-xl font-medium leading-6.5 tracking-tight">Delete User</h5>
        <p className="text-sm text-gray-alpha-11 leading-5.5 tracking-tight">
          Are you sure? The user <span className="font-medium">{user.first} {user.last}</span> will be permanently deleted.
        </p>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="secondary" onClick={onRequestClose}>Cancel</Button>
        <Button variant="danger" onClick={onDeleteUser}>Delete user</Button>
      </div>
    </Modal>
  )
}

export { DeleteUserModal };