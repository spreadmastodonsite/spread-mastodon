export const updateAccountData = {
  metaData: {
    title: 'Mastodon Account Update',
    name: 'Mastodon Account Update',
    description: 'Update Your Mastodon.Social Account',
  },
  // Content for the update account form
  heading: {
    text: 'Adding Your Profile Images & Short Bio',
  },
  subHeading: { text: '(Step 2 of 2; Optional But Recommended)' },
  defaultAvatarImage: {
    src: '/missing.png',
  },
  defaultBackgroundImage: {
    src: '/default-bg.png',
  },
  uploadAvatarButton: {
    text: 'Upload Your Avatar',
  },
  uploadBackgroundButton: {
    text: 'Upload Your Background Image',
  },
  bio: {
    text: 'Add Your Short Bio here...',
  },
  submitButton: {
    text: 'Save & Submit Your Profile Updates',
  },
  skipButton: {
    text: 'Skip This Step for Now',
    link: '/enhance-account',
  },

  // Content for the update account page after form submission
  successHeading: {
    textOne: 'Your Profile Is Set Up,',
  },
  successSubHeading: {
    text: 'Want to take it to the next level? The confirmation email you will receive from the Mastodon.Social server will link you to more ways to customize',
    link: {
      text: 'your profile',
      url: 'https://docs.joinmastodon.org/user/profile/',
    },
    textTwo: '.',
  },
  successButton: {
    text: 'Enhance Your Account Now',
    link: '/enhance-account',
  },
};
