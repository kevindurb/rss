import { build } from '../utils/fluent.js';

const defaultProps = {
  id: '',
  headerText: '',
};

export const makeModal = (props) => {
  const {
    id,
    headerText,
  } = { ...defaultProps, ...props };

  return (
    build('div')
    .class('modal')
    .id(id)
    .child(
      build('div')
      .class('modal-dialog')
      .child(
        build('div')
        .class('modal-content')
        .children([
          build('div')
          .class('modal-header')
          .child(
            build('h5')
            .class('modal-title')
            .child(headerText)
          ),
          build('div')
          .class('modal-body')
        ])
      )
    )
    .getElement()
  );
};

export const linkModalAndButton = (modal, button) => {
  button.setAttribute('data-target', `#${modal.id}`);
  button.setAttribute('data-toggle', 'modal');
};
