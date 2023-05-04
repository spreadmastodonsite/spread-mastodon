import Head from 'next/head';
import SignupForm from '../components/SignupForm';
import { signUpData as data } from '/data/signUp.js';

export default function SignUp() {
  return (
    <div className="content-wrapper c-page__interior">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img
        src="/-e-SpreadMastodon_Logo.png"
        alt="Spread Mastodon | Take Back Social"
        className="c-logo"
      />
      <main className="l-main ">
        <SignupForm />
      </main>
    </div>
  );
}
