import h from '../utils/createElement.js';

const defaultProps = {
  id: '',
  headerText: '',
};

export const makeModal = (props) => {
  const {
    id,
    headerText,
  } = { ...defaultProps, ...props };

  return h('div', { classList: ['modal'], id }, [
    h('div', { classList: ['modal-dialog'] }, [
      h('div', { classList: ['modal-content'] }, [
        h('div', { classList: ['modal-header'] }, [
          h('h5', { classList: ['modal-title'] }, headerText),
        ]),
      ]),
    ]),
  ]);
};

export const linkModalAndButton = (modal, button) => {
  button.setAttribute('data-target', `#${modal.id}`);
  button.setAttribute('data-toggle', 'modal');
};
