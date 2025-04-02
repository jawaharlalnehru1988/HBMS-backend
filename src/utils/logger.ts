import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: "debug", // Set the default log level
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, ...meta }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message} ${
                Object.keys(meta).length ? JSON.stringify(meta) : ""
            }`;
        })
    ),
    transports: [
        new transports.Console(), // Log to the console
        new transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to a file
        new transports.File({ filename: "logs/combined.log" }), // Log all levels to a file
    ],
});

export default logger;
