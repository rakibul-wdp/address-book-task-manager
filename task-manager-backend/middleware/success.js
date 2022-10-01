exports.successHandler = (message = "Success!") => {
  return {
    success: true,
    msg: message
  };
}
