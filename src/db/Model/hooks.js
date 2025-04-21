export const handleSaveError = (error, doc, next) => {
  const { code, name } = error;
  error.status = code === 11000 && name === 'MongoServerError' ? 409 : 409;
  next();
};

export const setUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidator = true;
  next();
};
