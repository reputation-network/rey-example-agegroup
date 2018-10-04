function decodeHeader(headers, headerName) {
  const headerValue = headers[headerName];
  const jsonHeaderValue = Buffer.from(headerValue, "base64").toString("utf8");
  const value = JSON.parse(jsonHeaderValue);
  return value;
}

function reyHeadersMiddleware(req, res, next) {
  const rey = {
    reader: decodeHeader(req.headers, "x-permission-reader"),
    source: decodeHeader(req.headers, "x-permission-source"),
    subject: decodeHeader(req.headers, "x-permission-subject"),
    session: decodeHeader(req.headers, "x-session"),
    extraReadPermissions: decodeHeader(req.headers, "x-extra-read-permissions"),
  };
  Object.defineProperty(req, "rey", { value: rey });
  next();
}

module.exports = reyHeadersMiddleware;
