import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ className, variant = 'small' }) {
  const componentClassName = cx('c-logo', className, {
    'c-logo--small': variant === 'small',
  });

  return (
    <Link href="/" className={componentClassName}>
      {variant === 'small' ? (
        <Image
          src="/spread_mastadon_small.png"
          alt="Spread Mastodon Logo | Take Back Social"
          width="64"
          height="64"
        />
      ) : (
        <Image
          src="/-e-SpreadMastodon_Logo.png"
          alt="Spread Mastodon Logo | Take Back Social"
          width="549"
          height="195"
        />
      )}
    </Link>
  );
}
