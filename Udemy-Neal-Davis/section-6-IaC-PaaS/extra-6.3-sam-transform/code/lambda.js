async function handler(event) {
  const nodeEnv = process.env.NODE_ENV;
  return {
    status: 200,
    message: `Serverless Application Model - (${nodeEnv})`,
  };
}

exports.handler = handler;
