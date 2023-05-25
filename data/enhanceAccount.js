export const EnhanceAccount = {
  metaData: {
    title: 'Join Mastodon',
    name: 'Join Mastodon',
    description:
      'Mastodon account signup using Next.js, React and Mastodon API',
    icon: '/favicon.ico',
  },
  heading: {
    textOne: "You're in! Now what?",
    textRotate: ['Follow People', 'Find Your Friends', 'Get Started'],
  },
  authHeader: {
    text: 'Authenticate Account',
  },
  authSubHeading: {
    text: '<p class="u-body--lg u-text-align--center">Please check your email and click the Mastodon confirmation link. Once you get to this message - <i>Your email address has been successfully confirmed.</i> - come back to this window to continue through the steps.</p>',
  },
  submitButton: {
    text: 'Log In & Authenticate',
  },
  cards: [
    {
      title:
        "In three minutes (or less) we'll get you set up with great users and topics to follow, and help you find your Twitter follows on Mastodon!",
      icon: 'enrich',
      iconWidth: '100',
      iconHeight: '113',
      link: '/follow-suggestions',
      linkText: `Let's Do It`,
    },
  ],
};
