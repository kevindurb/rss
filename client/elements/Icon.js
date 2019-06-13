export const makeIcon = ({ iconName }) => {
  const icon = document.createElement('i');
  icon.classList.add('fas');
  icon.classList.add(`fa-${iconName}`);

  return icon;
}
