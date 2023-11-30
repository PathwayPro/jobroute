# JobRoute

This is a [Next.js](https://nextjs.org/) project that retrieves data from the API developed with Python.

:warning: Before running the frontend make sure the server is already running. The steps can be found in backend's [README](https://github.com/PathwayPro/jobroute/tree/dev-backend/backend#readme).

## Requirements

NextJS 13 requires minimum Node.js version 16.14.0. To check which version you are currently using you can run:

```bash
node -v
```

## Getting Started

1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. This project uses [reCAPTCHA v2](https://www.google.com/recaptcha/admin/create) validation, so generate the keys that will be stored in .env.

3. Create a .env file that will store the environment variables. Example:

```
OPENAI_API_KEY=
RECAPTCHA_SECRET_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
