import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js"
import { createStore } from "solid-js/store";
import { useLogin } from "../contexts/LoginProvider";
import { useModal } from "../contexts/ModalProvider";
import { newList } from "../core/api";
import ModalForm from "./ModalForm";

type NewListStore = {
  title: string;
  description: string;
}

const NewList: Component = () => {
  const navigate = useNavigate();
  const [login] = useLogin();
  const { setModal } = useModal();
  const [form, setForm] = createStore<NewListStore>({ title: "", description: "" });

  const handleSubmit = async () => {
    let currLogin = login();
    if (currLogin) {
      let created_list = await newList(currLogin, form);
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
          value={form.title}
          oninput={(e: any) => { setForm("title", e.target.value) }}
          maxLength={80} required
        />
      </div>
      <div class="form-control">
        <label for="new-list-desc">Description</label>
        <input
          class="input input-bordered"
          type="text" name="new-list-desc" id="new-list-desc"
          value={form.description}
          oninput={(e: any) => { setForm("description", e.target.value) }}
          maxLength={255}
        />
      </div>
    </ModalForm>
  );
};

export default NewList;
