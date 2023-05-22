export const EnhanceAccount = {
  metaData: {
    title: 'Join Mastodon',
    name: 'Join Mastodon',
    description:
      'Mastodon account signup using Next.js, React and Mastodon API',
    icon: '/favicon.ico',
  },
  heading: {
    textOne: "You're in! Now What?",
    textRotate: ['Get Started', 'Follow People', 'Find Your Friends'],
  },
  authHeader: {
    text: 'Authenticate Account',
  },
  authSubHeading: {
    text: 'After you log in with your Mastodon account, we can help to set you up with great users and topics to follow, and help you find your Twitter follows on Mastodon! You can revoke this permission at any time by using the controls in the upper right to log out.',
  },
  cards: [
    {
      title:
        "In three minutes (or less) we'll get you set up with great users and topics to follow, and help you find your Twitter follows on Mastodon!",
      icon: 'enrich',
      iconWidth: '100',
      iconHeight: '113',
      link: '/follow-suggestions',
      linkText: `Let's do it`,
    },
  ],
};
