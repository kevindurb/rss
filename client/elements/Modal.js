const defaultProps = {
  id: '',
  headerText: '',
};

export const makeModal = (props) => {
  const {
    id,
    headerText,
  } = { ...defaultProps, ...props };

  const modal = document.createElement('div');

  modal.classList.add('modal');
  modal.setAttribute('id', id);

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
        </div>
        <div class="modal-body">
        </div>
      </div>
    </div>
  `;

  modal.querySelector('.modal-title').textContent = headerText;

  return modal;
};

export const linkModalAndButton = (modal, button) => {
  button.setAttribute('data-target', `#${modal.id}`);
  button.setAttribute('data-toggle', 'modal');
};
