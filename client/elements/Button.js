const defaultProps = {
  primary: false,
  text: '',
};

export const makeButton = (props) => {
  const {
    primary,
    text,
  } = { ...defaultProps, ...props };

  const button = document.createElement('button');

  button.textContent = text;
  button.classList.add('btn');

  if (primary) {
    button.classList.add('btn-primary');
  }

  return button;
};
