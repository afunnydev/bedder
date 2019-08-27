const businessViewRoomStyles = () => ({
  card: {
    display: 'flex',
    margin: '15px 0px',
    boxShadow: '1px 3px 3px rgba(0,0,0,0.4)'
  },
  cardMobile: {
    flexDirection: 'column',
  },
  cover: {
    width: 340,
    minHeight: 400,
    marginBottom: 0,
  },
  coverMobile: {
    width: '100%',
    minHeight: 200,
    marginBottom: 50,
  },
  content: {
    flex: '1',
    padding: '24px 35px !important',
  },
  contentMobile: {
    flex: '1',
    padding: '11px 15px !important',
  },
  roomName: {
    fontSize: 24,
    fontWeight: 500
  },
  available: {
    fontSize: 20,
    fontWeight: 300,
  },
  price: {
    fontSize: 25,
    fontWeight: 700,
  },
  cardContainer: {
    minHeight: '100%',
  },
  nbOfRooms: {
    fontSize: '27px',
    lineHeight: '27px',
    fontWeight: 500,
    margin: '0 30px',
    verticalAlign: 'middle',
  },
  leftButton: {
    display: 'inline-block',
    minWidth: 0,
    padding: '3px',
    borderRadius: '2px',
  },
  rightButton: {
    display: 'inline-block',
    minWidth: 0,
    padding: '6px',
    borderRadius: '2px',
  },
  divider: {
    marginBottom: 20,
  },
  dotsOn: {
    position: 'relative',
    '& .alice-carousel__wrapper': {
      boxShadow: '0px 3px 3px rgba(0,0,0,0.24)',
    },
    '& .alice-carousel__dots': {
      margin: '-40px 0 0',
      zIndex: 10,
      position: 'relative',
    },
    '& .alice-carousel__dots-item': {
      transition: '0.4s',
      width: 6,
      height: 6,
      backgroundColor: 'white',
    },
    '& .alice-carousel__dots-item:hover, .alice-carousel__dots-item.__active': {
      width: 10,
      height: 10,
      backgroundColor: 'white',
    }
  },
  bedroomInfo: {
    padding: '0 20px',
    listStyleType: 'circle',
    '& li': {
      fontSize: '16px',
      fontWeight: 300,
    }
  },
});

export default businessViewRoomStyles;