# Giving Coupons

URL of application: https://giving-coupons.vercel.app

Admin page: https://giving-coupons.vercel.app/admin

Please refer to submission file for credentials.

# List of group members:

- Bryann Yeap Kok Keong (A0217687N)
- Lee Yong Ler (A0219859J)
- Stuart Long Chay Boon (A0217528B)
- Tee Weile Wayne (A0149290B)

# Contributions:

- Bryann Yeap Kok Keong:
  - (Milestone 5) Designed and documented the REST API on apiary, and explained the purpose of each request
  - (Milestone 5) Explained how the API conforms to REST principles, as well as why we ignored certain practices
  - (Milestone 6) Shared and explained 8 SQL queries, as well as the Prisma (ORM) queries that they correspond to
  - (Milestone 11) Justified the choice of token-based authentication against session-based authentication
  - Implemented the API endpoints
  - Implemented the database schema in Prisma
  - Integrated authentication using Firebase Authentication by allowing email and password log in
  - Protected the relevant API routes
  - Set up redirection of page routes with respect to whether the user is logged in
  - Added a loading screen
- Lee Yong Ler:
  - (Milestone 4) Alternatives to REST
  - (Milestone 8) CSS methodolody write up
  - (Milestone 9) HTTPS setup and redirecting HTTP to HTTPS for secure browsing
  - (Milestone 10) PWA setup and UIUX testing on mobile end
  - (Milestone 10) Offline functionalities
  - (Milestone 12) MUI integration for better and uniform styling
  - (Milestone 12) Mobile site design principles
  - (Milestone 14) Google analytics setup for page views and event tracking
  - (Milestone 15) Lighthouse report
  - Feature - admin create campaign page, form validation, offline page
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
- Tee Weile Wayne
  - Came up with idea and convinced everyone
  - Secured donor
  - Designed overall flow
  - Designed coupon
  - Designed and implement redemption form
  - Implement campaign generation backend
  - Designed and improved homepage
  - Designed icon
  - Wrote pitch

# Set-up instructions for local testing

1. Clone the repo.
2. In the root directory, run `yarn` to install all the dependencies.
3. Download `.env` file with the environment variables (included in our submission) which includes credentials of our test database.
4. Run `yarn dev`
5. navigate to http://localhost:3000
6. Login to http://localhost:3000/admin with test credentials `giving.coupons.sg+test@gmail.com` and `password`
