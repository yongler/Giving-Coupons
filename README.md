# Giving Coupons

URL of application: https://giving-coupons.vercel.app/

# List of group members:

- Lee Yong Ler (A0219859J)
- Stuart Long Chay Boon (A0217528B)

# Contributions:

- Lee Yong Ler:
  - (Milestone 4) Alternatives to REST
  - (Milestone 8) MUI integration for better and uniform styling
  - (Milestone 9) HTTPS setup and redirecting HTTP to HTTPS for secure browsing
  - (Milestone 10) PWA setup and UIUX testing on mobile end
  - (Milestone 10) Setup offline functionalities
  - (Milestone 12) Mobile site design principles
  - (Milestone 14) Google analytics setup for page views and event tracking
  - (Milestone 15) Lighthouse report
  - Feature - admin create campaign page, offline page
  - Write ups for milestone 11
  
 - Stuart Long Chay Boon:
    - (Milestone 3) Design ER diagram and schema
    - Set up repository with basic pages and templates for team to use
    - (Milestone 8) Designed and built homepage including using MUI components
    - (Milestone 8) Designed basic template for form to use using MUI
    - (Milestone 8) Developed admin dashboard and admin campaign view pages using MUI components
    - Implemented sorting and filtering of table of vouchers
    - Integrated frontend with backend API calls with HTTP requests to communicate with server
    - Seeding database with charities to use
    - Participated in User Acceptance testing by distributing out physical vouchers

# Set-up instructions for local testing

1. Clone the repo.
2. In the root directory, run `npm install` to install all the dependencies.
3. Create `.env` file with the environment variables.
4. In the root directory, run `npx prisma generate` followed by `npx prisma studio` to setup the database. Take note that school/home wifi might not work. Changing to data will solve the issue.
5. In the root directory, run `npm run dev`.

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

To pull new changes from database, run

```bash
npx prisma db pull
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
