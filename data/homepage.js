export const homepageData = {
  metaData: {
    title: 'Mastodon Signup',
    name: 'Mastodon Signup',
    description:
      'Mastodon account signup using Next.js, React and Mastodon API',
  },
  heading: {
    textOne: 'Welcome to your',
    textRotate: ['Better', 'Ad-free', 'Open'],
    textTwo: 'Social Home',
  },
  subHeading: {
    text: "We can help you easily join Mastodon, enrich your experience if you've already joined, and share Mastodon with your friends and social networks.",
  },
  cards: [
    {
      title: "Don't have a Mastodon account?",
      description: 'Create an account in under a minute.',
      icon: 'join',
      iconWidth: '74',
      iconHeight: '74',
      link: '/join',
      linkText: 'Join',
    },
    {
      title: 'Already have a Mastodon account?',
      description: 'Discover how to maximize your experience.',
      icon: 'enrich',
      iconWidth: '74',
      iconHeight: '74',
      link: '/enhance-account',
      linkText: 'Enrich',
    },
    {
      title: 'Want to help grow Mastodon?',
      description: 'Help your friends and social networks join you.',
      icon: 'share',
      link: '/share-mastodon',
      iconWidth: '74',
      iconHeight: '74',
      linkText: 'Share',
    },
  ],
  disclaimer: {
    text: 'This site is not affiliated with Mastodon 9GMBH.',
    copyright: '© 2023 Spread Mastodon. All Rights Reserved.',
  },
};
