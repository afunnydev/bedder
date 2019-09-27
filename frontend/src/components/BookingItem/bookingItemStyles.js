const styles = theme => ({
  card: {
    display: 'flex',
    margin: '15px 0px',
    width: '100%',
  },
  cardMobile: {
    display: 'flex',
    margin: '15px 0px',
    width: '100%',
  },
  details: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    flex: '1',
    padding: '15px 25px',
  },
  contentMobile: {
    flex: '1',
    padding: '10px 15px',
  },
  cover: {
    width: '40%',
  },
  coverMobile: {
    width: '40%',
  },
  title: {
    margin: '8px 0px',
  },
  gains: {
    fontWeight: 700,
    marginTop: 15,
  },
  commission: {
    textDecoration: 'underline',
    fontStyle: 'italic',
    fontSize: 12,
  },
  starRate: {
    fontSize: 14,
  },
  personIcon: {
    fontSize: 44,
  },
  middleText: {
    margin: '0px 5px',
    position: 'relative',
    top: 3,
    fontSize: '16pt',
  },
  bedIcon: {
    color: theme.palette.primary.main,
    fontSize: 32,
    position: 'relative',
    top: 10,
    margin: 10,
  },
});

export default styles;