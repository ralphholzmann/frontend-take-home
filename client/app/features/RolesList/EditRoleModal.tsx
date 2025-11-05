import Button from '@/app/components/Button';
import ErrorMessage from '@/app/components/ErrorMessage';
import Input from '@/app/components/Input';
import { Modal, ModalRef } from '@/app/components/Modal';
import useInput from '@/app/hooks/useInput';
import { useToast } from '@/app/hooks/useToast';
import { patchRole } from '@/app/lib/API';
import { Role } from '@/app/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

type EditRoleModalProps = {
  role: Role;
  onRequestClose: () => void;
};

const EditRoleModal = ({ role, onRequestClose }: EditRoleModalProps) => {
  const { toast } = useToast();
  const modalRef = useRef<ModalRef>(null);
  const [nameValue, nameInputProps] = useInput<HTMLInputElement>(role.name);
  const [descriptionValue, descriptionInputProps] = useInput<HTMLTextAreaElement>(
    role.description || '',
  );
  const [isDefaultValue, setIsDefaultValue] = useState(role.isDefault);

  const client = useQueryClient();
  const patchRoleMutation = useMutation({
    mutationFn: (role: Pick<Role, 'id' | 'name' | 'description' | 'isDefault'>) => {
      return patchRole(role);
    },
    onSuccess: (...args) => {
      client.invalidateQueries({ queryKey: ['roles'] });
      toast(`${role.name} updated successfully!`);
      modalRef.current?.requestClose();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    patchRoleMutation.mutate({
      id: role.id,
      name: nameValue,
      description: descriptionValue,
      isDefault: isDefaultValue,
    });
  };

  return (
    <Modal ref={modalRef} onRequestClose={onRequestClose}>
      {({ requestClose }) => (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg leading-6.5 tracking-tight">Edit role</h2>
          {patchRoleMutation.isError && (
            <ErrorMessage>
              <span className="font-medium">Failed to edit role:</span>{' '}
              {patchRoleMutation.error.message}
            </ErrorMessage>
          )}
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input label="Name" name="name" autoFocus {...nameInputProps} />
            <Input label="Description" textarea name="description" {...descriptionInputProps} />
            <label className="text-gray-alpha-11 flex items-center gap-1.5 text-sm leading-5.5 font-medium tracking-tight">
              <input
                type="checkbox"
                name="isDefault"
                checked={isDefaultValue}
                onChange={() => setIsDefaultValue(!isDefaultValue)}
              />
              <span>Set as default role</span>
            </label>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={requestClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={patchRoleMutation.isPending}>
                {patchRoleMutation.isPending || patchRoleMutation.isSuccess
                  ? 'Saving…'
                  : 'Save changes'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default EditRoleModal;
