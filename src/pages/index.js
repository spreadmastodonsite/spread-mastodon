import Head from 'next/head';
import Button from '@/components/molecules/Button';
import Card from '@/components/molecules/Card';

const cardData = [
  {
    title: "Don't have a Mastodon account?",
    description: 'Create an account in under a minute.',
    icon: '👋',
    link: '/sign-up',
    linkText: 'Join',
  },
  {
    title: 'Already have a Mastodon account?',
    description: 'Discover how to maximize your experience.',
    icon: '🤘',
    link: '/follow-suggestions',
    linkText: 'Enrich',
  },
  {
    title: 'Want to help grow Mastodon?',
    description: 'Help your friends and social networks join you.',
    icon: '🤝',
    link: '/',
    linkText: 'share',
  },
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mastodon Signup</title>
        <meta
          name="description"
          content="Mastodon account signup using Next.js, React and Mastodon API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="content u-text-align--center">
          <img src="/mastodon.svg" alt="Logo goes here" />
          <h1>Welcome to your Better Social Home</h1>
          <p>
            We can help you easily join Mastodon, enrich your experience if
            you've already joined, and share Mastodon with your friends and
            social networks.
          </p>
        </div>

        {/* Might make a Grid/Flex component going forward depending on other pages */}
        <div className="card__row">
          {cardData.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              link={card.link}
              linkText={card.linkText}
            />
          ))}
        </div>

        <p className="u-text-align--center">
          This site is not affiliated with Mastodon 9GMBH. © 2023 Spread
          Mastodon. All Rights Reserved.
        </p>
      </main>
    </div>
  );
}
