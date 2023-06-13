export const signUpData = {
  metaData: {
    title: 'Mastodon Account Signup',
    name: 'Mastodon Account Signup',
    description: 'Setting You Up on Mastodon.Social (Step 1 of 2)',
  },

  // This is the data for the signup form
  heading: {
    text: 'Setting You Up on Mastodon.Social',
  },
  subHeading: {
    text: '(Step 1 of 2)',
  },
  description: {
    text: 'Join the whole Mastodon network via this trusted community server.',
    textTwo: `<p class="u-heading--lg u-text-align--center italic"><i>(We're <a class="c-link" href="/utilities/round-robin">exploring ways</a> to add more trusted servers soon!)</i></p>`,
  },
  formButton: {
    text: 'Great, Let’s Get You Set Up',
  },
  termsOfService: {
    text: 'Please accept the privacy policy and community server rules.',
  },

  // This is the data for the success page after the user has successfully signed up
  successHeading: {
    textOne: 'Confirmed:',
    textTwo: 'Welcome to Mastodon,',
  },
  successSubHeading: {
    text: "You're in! So what's next?",
  },
  successButtonOne: {
    text: 'Add Your Profile Basics',
    link: '/update-account',
  },
  successButtonTwo: {
    text: 'Skip This Step for Now',
    link: '/enhance-account',
  },
};
