import Button from '@/app/components/Button';
import { Modal } from '@/app/components/Modal';
import { User } from '@/app/types';

type DeleteUserModalProps = {
  user: User;
  onRequestClose: () => void;
  onDeleteUser: () => void;
};

const DeleteUserModal = ({ user, onRequestClose, onDeleteUser }: DeleteUserModalProps) => {
  return (
    <Modal onRequestClose={onRequestClose}>
      <div className="text-grays-12 mb-4 space-y-3">
        <h5 className="text-xl leading-6.5 font-medium tracking-tight">Delete User</h5>
        <p className="text-gray-alpha-11 text-sm leading-5.5 tracking-tight">
          Are you sure? The user{' '}
          <span className="font-medium">
            {user.first} {user.last}
          </span>{' '}
          will be permanently deleted.
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onRequestClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onDeleteUser}>
          Delete user
        </Button>
      </div>
    </Modal>
  );
};

export { DeleteUserModal };
