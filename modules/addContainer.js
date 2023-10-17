export const addContainer = (parentElem, className = '') => {
  const container = document.createElement('div');
  container.className = 'container';
  if (className) {
    container.classList.add(className);
  }

  parentElem.append(container);

  return container;
};
