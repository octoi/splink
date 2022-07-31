# Splink

Copy & share internet 🔗

## SETUP
> Make sure you have node & npm installed

1. Install all dependencies
  ```bash
  $ npm install
  ## or yarn
  $ yarn
  ```
2. Fill up env variables
  ```env
  DATABASE_URL='mysql://root:password@127.0.0.1:3306/splink'
  NEXT_PUBLIC_IMGBB_KEY='YOUR_IMGBB_API_KEY'
  ```
  You can get IMGBB api key at https://api.imgbb.com/


3. Setup prisma
   ```bash
   $ npm run migrate
   ## or yarn
   $ yarn migrate
   ```
4. Prisma generate
   ```bash
   $ npx prisma generate
   ```
5. Run
   ```bash
   $ npm run dev
   ## or yarn
   $ yarn dev
   ```