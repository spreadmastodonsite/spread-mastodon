export const followTagsData = {
  metaData: {
    title: 'Mastodon Signup',
    name: 'Mastodon Signup',
    description:
      'Mastodon account signup using Next.js, React and Mastodon API',
  },
  heading: { text: 'Getting Started on Mastodon: 2 of 4' },
  heading2: { 
    partOne: 'Follow',
    toolTip: {
      label: 'Topics',
      value: 'Topics are selected based on most searched on Mastodon.'
    },
    partTwo: 'You Care About'
  },
  subHeading: {
    text: 'Click the button below to view suggested topics to follow.',
    toolTip: {
      label: 'Notable',
      value: 'Hashtabs selected based on popular accounts.'
    }
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
    ,{
      category: 'News',
      tags: [
        {
          name: 'News',
          url: 'https://mastodon.social/tags/news',
        },
        {
          name: 'Weather',
          url: 'https://mastodon.social/tags/weather',
        },
        {
          name: 'Politics',
          url: 'https://mastodon.social/tags/Politics',
        },
      ],
    },
  ],
};
