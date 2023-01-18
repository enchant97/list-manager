import { Component, JSX } from "solid-js";
import ModalOuter from "./ModalOuter";

type ModalFormProps = {
  title: string
  onSubmit: () => {}
  onCancel: () => {}
  children: JSX.Element
}

const ModalForm: Component<ModalFormProps> = (props) => {
  const onSubmit = (event: any) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <ModalOuter>
      <form onsubmit={onSubmit} class="modal-box">
        <h3 class="font-bold text-lg">{props.title}</h3>
        {props.children}
        <div class="modal-action">
          <div class="btn-group">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" onclick={props.onCancel} class="btn">Cancel</button>
          </div>
        </div>
      </form>
    </ModalOuter>
  );
};

export default ModalForm;
