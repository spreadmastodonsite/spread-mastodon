import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Button from '@/components/molecules/Button';
import StepperHeader from '@/components/molecules/StepperHeader';
import Logo from '@/components/atoms/Logo';

import { explainerData as data } from '/data/explainer.js';

export default function MastodonExplainer() {
  return (
    <div className="content-wrapper">
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Logo />
      <main className="l-main c-page__interior">
        <StepperHeader
          iconName="join"
          iconWidth="75"
          iconHeight="83"
          heading={data.heading.text}
          subHeading={data.subHeading.text}
        />
        <div className="c-explainer--content">
          <h2 className="u-heading--3xl">Mastodon Explainer</h2>
          <h2 className="u-heading--2xl">How Mastodon is different</h2>

          <p>
            Using Mastodon is easier once you learn one big difference from
            other social media platforms: You can access it on thousands of
            different websites.
          </p>

          <h3 className="u-heading--lg">This is Twitter.</h3>

          <p>
            Lots of people use it to talk to one another! It’s one big website,
            and the people who run it spend a lot of money to keep it going.
            Twitter uses advertising to pay the bills.
          </p>

          <figure>
            <Image
              src="/assets/explainer/birdsite.png"
              alt="A single circle containing the Twitter logo, surrounded by lots of stick figures"
              width="500"
              height="527"
              loading="lazy"
            />
          </figure>

          <p>Lately a few things have gone wrong with Twitter.&nbsp;</p>

          <p>
            Some people have moved to a different social network that’s pretty
            different than the ones you’re used to.
          </p>

          <h3 className="u-heading--lg">This is Mastodon.</h3>

          <p>
            Instead of one big website, it’s made up of lots of smaller
            websites, connected through a bunch of magic internet pipes.
          </p>

          <figure>
            <Image
              src="/assets/explainer/mastodon.png"
              alt="A bunch of purple circles with a Mastodon logo inside. All the circles are connected together with purple pipes. Each circle has one or more stick figures standing around it."
              width="500"
              height="500"
              loading="lazy"
            />
          </figure>

          <p>
            Those magic internet pipes allow people on each Mastodon website to
            interact with people on all the other Mastodon websites.
          </p>

          <p>
            Nobody owns Mastodon. Each website is run independently of the
            others, but they all mostly get along.
          </p>

          <p>
            Most Mastodon websites rely on donations to pay the bills. That way,
            no single person or entity owns Mastodon.
          </p>

          <p>
            The biggest difference between Mastodon and big social platforms is
            that you can access Mastodon via different websites (aka “servers”
            or “instances”).
          </p>

          <p>
            If you want to sign up for Twitter, you just type in its website
            address.
          </p>

          <figure>
            <Image
              src="/assets/explainer/twitterdotcom.png"
              alt="Web browser address bar with twitter.com written inside"
              width="500"
              height="204"
              loading="lazy"
            />
          </figure>

          <p>
            For Mastodon, though, there isn’t one single website; there are
            thousands.
          </p>

          <p>
            No matter which one you join, you can talk with everyone on all the
            others, and you can switch whenever you want.
          </p>

          <ul className="c-explainer__list">
            <li className="c-explainer__list-item">
              <figure>
                <Image
                  src="/assets/explainer/kpopdotsocial.png"
                  alt="Web browser address bar with kpop.social written inside"
                  width="300"
                  height="121"
                  loading="lazy"
                />
              </figure>

              <p className="has-text-align-center">for K-pop fans</p>
            </li>
            <li className="c-explainer__list-item">
              <figure>
                <Image
                  src="/assets/explainer/bolognadotone.png"
                  alt="Web browser address bar with bologna.one written inside"
                  width="300"
                  height="121"
                  loading="lazy"
                />
              </figure>

              <p className="has-text-align-center">
                for people from Bologna, Italy
              </p>
            </li>

            <li className="c-explainer__list-item">
              <figure>
                <Image
                  src="/assets/explainer/techdotlgbt.png"
                  alt="Web browser address bar with tech.lgbt written inside"
                  width="300"
                  height="121"
                  loading="lazy"
                />
              </figure>

              <p className="has-text-align-center">for LGBT people in tech</p>
            </li>
            <li className="c-explainer__list-item">
              <figure>
                <Image
                  src="/assets/explainer/masdotto.png"
                  alt="Web browser address bar with mas.to written inside"
                  width="300"
                  height="121"
                  loading="lazy"
                />
              </figure>
              <p className="has-text-align-center">
                a catch-all Mastodon website
              </p>
            </li>
          </ul>

          <p>These are just a few — there are thousands of Mastodon servers.</p>
          <br />
          <p>
            Once you’ve signed up, you can follow people from all the other
            Mastodon servers.
          </p>

          <p>
            Mastodon gives you access to millions of peoples’ thoughts, just
            like Twitter.
          </p>

          <figure>
            <Image
              src="/assets/explainer/timeline.png"
              alt="A snapshot of what Mastodon looks like when visiting kpop.social"
              width="500"
              height="781"
              loading="lazy"
            />
          </figure>

          <p>That’s it!</p>

          <p>
            Adapted with gratitude from{' '}
            <Link className="c-link" href="http://mattbrown.dev/mastodon">
              a great essay by Matt Brown
            </Link>
            .
          </p>
        </div>

        <Button
          className="c-button--explainer"
          text={data.ctaButton.text}
          link={data.ctaButton.link}
        />
      </main>
    </div>
  );
}
