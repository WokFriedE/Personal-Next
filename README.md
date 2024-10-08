This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Libs Used

-   Icons
    -   [heroicons-outline](https://icones.js.org/collection/heroicons-outline)
    -   [VSCODE Icons](https://icones.js.org/collection/vscode-icons)
    -   [Grommet Icons](https://icones.js.org/collection/grommet-icons)
    -   [Logos](https://icones.js.org/collection/logos)
-   [Toastify](https://fkhadra.github.io/react-toastify/introduction/)
-   SQLite3 + SQLite

# Technologies used

-   NextJS
-   SQLite + sqlite3

# Some issues I found out

-   next js img html src's start in the public folder
-   client side comps cannot open env files
-   Middleware should be in src file and can be used to process specific routes
    -   () allows matching paths to use regex
-   NextJS now uses a metadata export in the main layout for things like title and icons

# Items I Want to Look Into

-   [page transitions](https://www.youtube.com/watch?v=fx6KMItwJAw)
-   [image storage](https://vercel.com/docs/storage/vercel-blob/server-upload)

# Todo in the future

[ ] Make a shortcuts page where people can suggest keyboard shortcuts / language tips [ ] Make an API endpoint for it

# Concepts I Learned

-   You can use server actions (which are like server functions) in forms and as async functions on the client side
    -   This is useful for maintaining env security and reducing client side loads
-   Vercel prefers / suggests that NextJS should not have built in api routes as it needs to exit the network to just come back --> it is more efficient to code direct interactions
