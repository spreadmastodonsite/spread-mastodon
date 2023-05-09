import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ className }) {
  const componentClassName = cx('c-logo', className, {});

  return (
    <Link href="/" className={componentClassName}>
      <Image
        src="/-e-SpreadMastodon_Logo.png"
        alt="Spread Mastodon Logo | Take Back Social"
        width="400"
        height="154"
      />
    </Link>
  );
}
