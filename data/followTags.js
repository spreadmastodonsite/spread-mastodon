export const followTagsData = {
  metaData: {
    title: 'Mastodon Signup',
    name: 'Mastodon Signup',
    description:
      'Mastodon account signup using Next.js, React and Mastodon API',
  },
  heading: { text: 'Follow Topics' },
  subHeading: {
    text: 'Click the button below to view suggested topics to follow.',
  },
  secondHeading: { text: 'Suggested Topics' },
  followAllButton: { text: 'Follow All' },
  followTagButton: { text: 'Follow' },
  suggestTags: [
    {
      category: 'movies',
      tags: [
        {
          name: 'throwbackthursday',
          url: 'https://mastodon.social/tags/throwbackthursday',
        },
        {
          name: 'marvel',
          url: 'https://mastodon.social/tags/marvel',
        },
        {
          name: 'movies',
          url: 'https://mastodon.social/tags/movies',
        },
      ],
    },
    {
      category: 'Sports',
      tags: [
        {
          name: 'football',
          url: 'https://mastodon.social/tags/football',
        },
        {
          name: 'soccer',
          url: 'https://mastodon.social/tags/soccer',
        },
        {
          name: 'golf',
          url: 'https://mastodon.social/tags/golf',
        },
      ],
    },
  ],
};
