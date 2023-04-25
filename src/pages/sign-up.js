import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SignupForm from '../components/SignupForm';

export default function SignUp() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mastodon Signup</title>
        <meta
          name="description"
          content="Mastodon account signup using Next.js, React and Mastodon API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="u-text-align--center">Mastodon Account Signup</h1>

        <SignupForm />
      </main>
    </div>
  );
}
