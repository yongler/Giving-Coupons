# Giving Vouchers

URL of application: https://2022-a3-2022-a3-group-1.vercel.app/

List of group members:

- Lee Yong Ler (A0219859J)

Contributions:

- Lee Yong Ler:
  - (Milestone 9) MUI integration for better and uniform styling
  - (Milestone 9) PWA setup and UIUX testing on mobile end
  - (Milestone 9) Setup offline functionalities
  - (Milestone 9) HTTPS setup and redirecting HTTP to HTTPS for secure browsing
  - 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Create `.env` file with `DATABASE_URL`
2. `yarn`

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

For prisma:
To create tables in database after creating schema, run

```bsh
npx prisma db push
```

After updating database, run

```bash
npx prisma generate
```

To view db GUI, run

```bash
npx prisma studio
```

## Resources

https://www.youtube.com/watch?v=ARNN_zmrwcw
https://medium.com/geekculture/how-to-make-a-next-js-app-a-pwa-a5e2b13da548

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
