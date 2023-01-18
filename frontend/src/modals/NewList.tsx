import { useNavigate } from "@solidjs/router";
import { Component, createSignal } from "solid-js"
import { useLogin } from "../contexts/LoginProvider";
import { useModal } from "../contexts/ModalProvider";
import { newList } from "../core/api";
import ModalForm from "./ModalForm";

type NewListSignal = {
  title: string;
  description: string;
}

const NewList: Component = () => {
  const navigate = useNavigate();
  const [login] = useLogin();
  const { setModal } = useModal();
  const [getNewList, setNewList] = createSignal<NewListSignal>({ title: "", description: "" });

  const handleTitleChange = (event: any) => {
    setNewList({ title: event.target.value, description: getNewList().description });
  };
  const handleDescriptionChange = (event: any) => {
    setNewList({ title: getNewList().title, description: event.target.value });
  };
  const handleSubmit = async () => {
    let currLogin = login();
    if (currLogin) {
      let created_list = await newList(currLogin, getNewList());
      setModal(null);
      navigate(`/lists/${created_list.id}`);
    }
  };

  return (
    <ModalForm title="New List" onSubmit={handleSubmit} onCancel={() => { setModal(null); }}>
      <div class="form-control">
        <label for="new-list-title">Title</label>
        <input
          class="input input-bordered"
          type="text" name="new-list-title" id="new-list-title"
          value={getNewList().title}
          onChange={handleTitleChange}
          maxLength={80} required
        />
      </div>
      <div class="form-control">
        <label for="new-list-desc">Description</label>
        <input
          class="input input-bordered"
          type="text" name="new-list-desc" id="new-list-desc"
          value={getNewList().description}
          onChange={handleDescriptionChange}
          maxLength={255}
        />
      </div>
    </ModalForm>
  );
};

export default NewList;
