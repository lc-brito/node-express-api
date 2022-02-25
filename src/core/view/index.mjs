let viewRender;

function boot(app) {
  viewRender = (...args) => app.render(...args);
}

function render(...args) {
  return viewRender(...args);
}

export {
  boot,
  render,
};
