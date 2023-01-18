import { Component, JSX } from "solid-js";

type ModalOuterProps = {
  children: JSX.Element
}

const ModalOuter: Component<ModalOuterProps> = (props) => {
  return (
    <div class="modal modal-open">
      {props.children}
    </div>
  );
};

export default ModalOuter;
