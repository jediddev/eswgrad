import { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";

/**
 * Convert file names into express routes:
 * - index.ts → /users
 * - [id].ts → /users/:id
 */
function toExpressSegment(segment: string) {
    return segment.replace(/\[(.+?)\]/g, ":$1");
}

export function loadRoutes(app: Express) {
    const routesDir = path.join(__dirname, "..", "routes");

    function walk(dir: string, baseRoute = "") {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                const segment = toExpressSegment(file);
                const newBase = `${baseRoute}/${segment}`.replace(/\/+/g, "/");
                walk(filePath, newBase);
            } else if (file.endsWith(".ts") || file.endsWith(".js")) {
                let route = baseRoute;

                // remove extension
                const name = file.replace(/\.(ts|js)$/, "");

                if (name !== "index") {
                    // convert [id] → :id
                    route += "/" + toExpressSegment(name);
                }

                const handler = require(filePath);

                // Attach methods based on exported functions
                if (handler.GET) app.get(route, handler.GET);
                if (handler.POST) app.post(route, handler.POST);
                if (handler.PUT) app.put(route, handler.PUT);
                if (handler.DELETE) app.delete(route, handler.DELETE);

                console.log("Loaded route:", route);
            }
        });
    }

    walk(routesDir);
}
