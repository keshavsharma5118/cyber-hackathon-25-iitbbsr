export const success = (res, msg, data = {}) =>
  res.status(200).json({ success: true, message: msg, data });

export const error = (res, msg, code = 500) =>
  res.status(code).json({ success: false, message: msg });
