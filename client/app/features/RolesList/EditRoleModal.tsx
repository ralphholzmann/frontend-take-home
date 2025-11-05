import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { Modal } from "@/app/components/Modal";
import useInput from "@/app/hooks/useInput";
import { Role } from "@/app/types";
import { useState } from "react";

type EditRoleModalProps = {
  role: Role
  onRequestClose: () => void;
  onEditRole: (role: Pick<Role, 'id' | 'name' | 'description' | 'isDefault'>) => void;
}

const EditRoleModal = ({ role, onRequestClose, onEditRole }: EditRoleModalProps) => {
  const [nameValue, nameInputProps] = useInput<HTMLInputElement>(role.name);
  const [descriptionValue, descriptionInputProps ] = useInput<HTMLTextAreaElement>(role.description || '');
  const [isDefaultValue, setIsDefaultValue] = useState(role.isDefault);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEditRole({id: role.id, name: nameValue, description: descriptionValue, isDefault: isDefaultValue});
  }

  return (
    <Modal onRequestClose={onRequestClose}>
      <h2 className="text-lg leading-6.5 tracking-tight mb-2">Edit role</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input label="Name" name="name" {...nameInputProps} />
        <Input label="Description" textarea name="description" {...descriptionInputProps} />
        <label className="text-sm text-gray-alpha-11 leading-5.5 tracking-tight font-medium flex gap-1.5 items-center">
          <input type="checkbox" name="isDefault" checked={isDefaultValue} onChange={() => setIsDefaultValue(!isDefaultValue)} />
          <span>Set as default role</span>
        </label>
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onRequestClose}>Cancel</Button>
          <Button variant="primary" type="submit">Save changes</Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditRoleModal;