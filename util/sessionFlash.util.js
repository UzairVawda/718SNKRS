function dataFromSession(req) {
  const sessionData = req.session.dataFlash;
  req.session.dataFlash = null;
  return sessionData;
}

function dataToSession(req, data, action) {
  req.session.dataFlash = data;
  req.session.save(action);
}

module.exports = {
  fromSession: dataFromSession,
  toSession: dataToSession,
};
