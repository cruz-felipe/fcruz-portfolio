import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getHomepage() {
  const file = path.join(CONTENT_DIR, "homepage.json");
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function getWork(slug: string) {
  const file = path.join(CONTENT_DIR, "work", `${slug}.json`);
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function getAllWork() {
  const dir = path.join(CONTENT_DIR, "work");
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")));
}
