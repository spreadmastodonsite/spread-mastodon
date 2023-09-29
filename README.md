This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First install the app

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Mastodon API Access

Login to your mastodon accound and edit your profile
Under the Development item in the menu and create a New Application
Add the required fields and set up your scopes as you need them then Create Application
Create a `.env.local` in the root of the application and add the 4 enviorment variables

```bash
MASTODON_INSTANCE_URL={your site url}
MASTODON_CLIENT_ID={your client ID provided from creating application above}
MASTODON_CLIENT_SECRET={your client SECRET provided from creating application above}
MASTODON_ACCESS_TOKEN={your client TOKEN provided from creating application above}
```

Make sure to add this file to your .gitignore as to not share with others.

## Mastodon Account Details

Navigate to http://localhost:3000/api/searchAccounts?searchTerm=[name-of-account] to get the account details of a Mastodon account, where `[name-of-account]` is the name of the account you want to search for. For example, to search for the account `@Gargron`, you would navigate to http://localhost:3000/api/searchAccounts?searchTerm=Gargron.

## Mastodon Tag Details

Navigate to http://localhost:3000/api/searchTags?tagName=[name-of-tag] to get the tag details of a Mastodon tag, where `[name-of-tag]` is the name of the tag you want to search for. For example, to search for the tag `movies`, you would navigate to http://localhost:3000/api/searchTags?tagName=movies.

## Mastodon Documentation

Using the [Mastodon Docs API](https://docs.joinmastodon.org/) is where you would modify the api requests to sign in or authenticate

## Other Next.js Stuff

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Merging your Pull Request into the main branch will automaticly build & deploy to production

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
