import FirstImage from './FirstImage'
import SecondImage from './SecondImage'
import ThirdImage from './ThirdImage'

const CardData = [
  {
    id: '1',
    Image: FirstImage,
    title: 'Exchange or Buy Instantly',
    highlightTitleWords: ['Buy'],
    description:
      "Don't just shop—swap! Trade your read books for new adventures or buy directly from fellow book lovers.",
  },
  {
    id: '2',
    Image: SecondImage,
    title: 'Secure & Private Messaging',
    highlightTitleWords: ['Private'],
    description:
      'Negotiate prices and arrange meetups safely. Our in-app chat keeps your personal contact details hidden.',
  },
  {
    id: '3',
    Image: ThirdImage,
    title: 'Discover Books Around you',
    highlightTitleWords: ['Around','you'],
    description:
      'Browse thousands of books available for exchange or purchase right in your neighborhood.',
  },
]

export default CardData
