const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/vending-api_development",
      test: "postgres://postgres:postgres@localhost:5432/vending-api_test",
      e2e: "postgres://postgres:postgres@localhost:5432/vending-api_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
