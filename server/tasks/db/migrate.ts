export default defineTask({
    meta: {
      name: "db:migrate",
      description: "Run database migrations",
    },
    run({ payload, context }) {
      console.log('This is the payload', payload)
      console.log('This is the context', context)
      console.log("Running DB migration task...");
      return { result: "Success" };
    },
  });


