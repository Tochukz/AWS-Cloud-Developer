exports.handler = async (event) => {
  console.log(event);

  const { headers, rawQueryString, rawPath, cookies, requestContext } = event;
  const cookiesAsObjects = [];
  if (Array.isArray(cookies)) {
    cookies.forEach((keyValue) => {
      const [key, value] = keyValue.split("=");
      cookiesAsObjects.push({ [key]: value });
    });
  }
  const queryStringsAsObjects = [];
  if (rawQueryString) {
    rawQueryString.split("&").forEach((keyValue) => {
      const [key, value] = keyValue.split("=");
      queryStringsAsObjects.push({ [key]: value });
    });
  }
  const message = "Lambda Handler Verion 0.0.1";
  const response = {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      {
        message,
        path: rawPath,
        headers,
        queryStrings: rawQueryString,
        queryStringsAsObjects,
        cookies,
        cookiesAsObjects,
      },
      null,
      2
    ),
  };

  return response;
};
