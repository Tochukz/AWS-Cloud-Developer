const https = require("https");

function makeApiCall(url, method = "GET", headers = {}, data = null) {
  return new Promise((resolve, reject) => {
    const { hostname, pathname, search, protocol } = new URL(url);
    const path = pathname + (search || "");
    const isHttps = protocol === "https:";

    const httpModule = isHttps ? https : require("http");

    const options = {
      hostname,
      path,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    const req = httpModule.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          if (responseData) {
            const parsedData = JSON.parse(responseData);
            resolve(parsedData);
          } else {
            resolve({});
          }
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on("error", (error) => {
      reject(new Error(`API request failed: ${error.message}`));
    });

    // If there's request data, write it to the request body
    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      const requestBody = JSON.stringify(data);
      req.write(requestBody);
    }

    req.end();
  });
}

/** Makes API call to public API  */
exports.handler = async function () {
  try {
    const response = await makeApiCall(
      "https://jsonplaceholder.typicode.com/todos/1",
      "GET",
      { Accept: "application/json" }
    );
    console.log("API Response:", response);
    return response;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
