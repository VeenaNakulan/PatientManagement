module.exports = {
  successMessage: (res, data, message) => {
    res.json({ success: true, data, message });
  },
  errorMessage: (res, err) => {
    res.json({ success: false, message: err.message });
  },
  postData: (model, data) => {
    return model.create(data);
  },
  editData: async (model, id, data) => {
    await model.findByIdAndUpdate(id, data);
  },
  // deleteData: async (model, id) => {
  //   const User = await model.findById(model, { _id: id });
  //   return !User
  //     ? errorMessage({ message: 'Id does not exist' })
  //     : await model.findByIdAndDelete({ _id: id });
  // },
};
