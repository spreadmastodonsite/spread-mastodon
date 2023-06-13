export const EnhanceAccount = {
  metaData: {
    title: 'Spread Mastodon - Join Mastodon',
    name: 'Join Mastodon',
    description:
      'Mastodon account signup using Next.js, React and Mastodon API',
  },
  heading: {
    textOne: "You're in! Now what?",
    textRotate: ['Follow People', 'Find Your Friends', 'Get Started'],
  },
  headingTwo: {
    text: 'New User?',
  },
  subHeadingTwo: {
    text: '<p class="u-body--lg u-text-align--center">Please check your email and click the Mastodon confirmation link. Once you get to this message - <i>Your email address has been successfully confirmed.</i> - come back to this window to continue through the steps.</p>',
  },
  headingThree: {
    text: 'Existing User?',
  },
  subHeadingThree: {
    text: '<p class="u-body--lg u-text-align--center">If you already have a Mastodon account set up, just log in and authenticate with your account:</p>',
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
