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
  },
  // If you want to show [redacted]
  // redact: ["companyMail", "password", "address"],

  // If you want to remove the redacted fields
  redact: {
    paths: ['email', 'password', 'address'],
    remove: true,
  },
}, transport);

const employee = {
  id: 1,
  username: "John",
  age: 35,
  email: "johndoe@test.com",
  password: "Mysecretpassword",
  address: {
    "Street": "Brick Lane",
    "City": "London",
  },
}

logger.info(employee, "Employee Record");
