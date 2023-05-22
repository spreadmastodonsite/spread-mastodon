import Head from 'next/head';
import Logo from '@/components/atoms/Logo';
import SignupForm from '../components/Organism/SignupForm';
import { signUpData as data } from '/data/signUp.js';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  return (
    <div className="content-wrapper">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={data.metaData.name} />
        <meta property="og:description" content={data.metaData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={router.pathname} />
        <meta property="og:image" content="https://join-mastodon-poc.vercel.app/spread_mastodon_share.jpg" />
        <meta name="twitter:title" content={data.metaData.name} />
        <meta name="twitter:description" content={data.metaData.description} />
        <meta name="twitter:image" content="https://join-mastodon-poc.vercel.app/spread_mastodon_share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Logo />
      <main className="l-main c-page__interior">
        <SignupForm />
      </main>
    </div>
  );
}
