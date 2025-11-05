import Button from '@/app/components/Button';
import ErrorMessage from '@/app/components/ErrorMessage';
import { Modal, ModalRef } from '@/app/components/Modal';
import { useToast } from '@/app/hooks/useToast';
import { deleteUser } from '@/app/lib/API';
import { User } from '@/app/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

type DeleteUserModalProps = {
  user: User;
  onRequestClose: () => void;
};

const DeleteUserModal = ({ user, onRequestClose }: DeleteUserModalProps) => {
  const { toast } = useToast();
  const client = useQueryClient();
  const modalRef = useRef<ModalRef>(null);
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => {
      return deleteUser(userId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users'] });
      toast(`${user.first} ${user.last} deleted successfully!`);
      modalRef.current?.requestClose();
    },
  });

  const onDeleteUser = () => {
    deleteUserMutation.mutate(user.id);
  };

  return (
    <Modal ref={modalRef} onRequestClose={onRequestClose}>
      {({ requestClose }) => (
        <>
          <div className="text-foreground mb-4 space-y-3">
            <h5 className="text-xl leading-6.5 font-medium tracking-tight">Delete User</h5>
            {deleteUserMutation.isError && (
              <ErrorMessage>
                <span className="font-medium">Failed to delete user:</span>{' '}
                {deleteUserMutation.error.message}
              </ErrorMessage>
            )}
            <p className="text-sm leading-5.5 tracking-tight">
              Are you sure? The user{' '}
              <span className="font-medium">
                {user.first} {user.last}
              </span>{' '}
              will be permanently deleted.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={requestClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onDeleteUser}>
              {deleteUserMutation.isPending || deleteUserMutation.isSuccess
                ? 'Deleting…'
                : 'Delete user'}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export { DeleteUserModal };
