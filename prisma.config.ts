import { defineConfig } from "prisma/config";

// Note: On Vercel, DATABASE_URL is set as an Environment Variable in the dashboard.
// Locally it's in .env.local — Next.js loads that automatically, and prisma CLI
// picks it up from process.env.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
