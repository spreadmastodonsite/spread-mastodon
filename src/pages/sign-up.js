import Head from 'next/head';
import Logo from '@/components/atoms/Logo';
import SignupForm from '../components/Organism/SignupForm';
import { signUpData as data } from '/data/signUp.js';

export default function SignUp() {
  return (
    <div className="content-wrapper">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logo />
      <main className="l-main c-page__interior">
        <SignupForm />
      </main>
    </div>
  );
}
