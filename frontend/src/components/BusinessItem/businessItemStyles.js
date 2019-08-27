const businessItemStyles = () => ({
  card: {
    marginBottom: 15,
    backgroundColor: 'white',
    display: 'block',
  },
  media: {
    height: 0,
    borderRadius: 4,
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    padding: '20px',
    '&:last-child': {
      paddingBottom: '20px',
    },
  },
  locationText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 7,
  },
  iconLocation: {
    marginRight: 5
  },
  ratingButton: {
    minWidth: 'auto',
    marginTop: 7,
    fontSize: 18,
    padding: '5px 10px',
  },
  reviewsText: {
    fontSize: 10,
    marginTop: 5,
  },
  priceText: {
    fontWeight: 'bold',
    '& span': {
      color: '#000',
      fontWeight: 'normal',
      marginLeft: 4,
    }
  },
  totalText: {
    marginTop: 2,
    fontSize: 12,
  },
  businessName: {
    fontSize: 24,
    lineHeight: '28px',
  },
  chip: {
    margin: 2,
    fontSize: 10,
  },
  helpIcon: {
    fontSize: 15,
    marginLeft: 5,
    opacity: '0.5',
  }
});

export default businessItemStyles;