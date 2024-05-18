This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the following command to install the dependencies and start the app:

```bash
./scripts/start-app.sh
```

If this is your first time running the app, you may need to sync the database schema:

```bash
pnpm run db:push
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/[locale]/page.tsx`. The page auto-updates as you edit the file.

## What's inside?

This project uses the following technologies:

- [next-intl](https://next-intl-docs.vercel.app/) for internationalization
- [react-query](https://tanstack.com/query/latest/) for data fetching
- [next-safe-action](https://next-safe-action.dev/) for server actions with type safety, input validation and more
- [shadcn-ui](https://ui.shadcn.com/) for UI components
- [tailwindcss](https://tailwindcss.com/) for styling
- [biome](https://biomejs.dev/) for linting and formatting
- [commitlint](https://commitlint.js.org/) for commit message linting
- [husky](https://typicode.github.io/husky/) for git hooks
- [lint-staged](https://github.com/lint-staged/lint-staged) for running linters on staged files

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
