const pino = require("pino");

// Create a transport
const transport = pino.transport({
  target: "pino-pretty",
  options: {
    destination: "./logs/output.log",
    mkdir: true,
  }
});

// Create a logger instance
const logger = pino({
  customLevels: { catastrophe: 70 },
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() }
    }
  }
}, transport);

logger.info("Hello from Pino");
logger.catastrophe("Catastrophe error");

try {
  throw new Error("Division Error")
} catch (err) {
  console.log("Here");
  logger.error(err, "Error occurred during division")
}

// Adding custom output to the logger

// logger.error({ username: "Ritesh", password: "Not available" }, "A critical error occurred!");


// Adding child logger means that you need not explicitly keep adding certain 
// fields and you can reduce the amount of boiler-plate code
// const username = "Ritesh";
// const usernameLogger = logger.child({ username: username });
// usernameLogger.info("Hello From Pino")
// usernameLogger.error("Hello From Pino")

// Logging errors
// err = { "error": "Error occurred" }
// logger.error(err, "Error occurred during division");

