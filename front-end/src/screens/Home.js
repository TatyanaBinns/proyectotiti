import {Box, Button, TextField,Typography, Container, Grid, makeStyles} from '@material-ui/core';
import "./styles.css";
import Header from "./Header";



function Home() {
  
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(12, 4),
    },
    card: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid black',
      borderRadius: '5px',
      textAlign: 'center',
    },
    icon: {
      padding: theme.spacing(2, 0),
    },
    title: {
      padding: theme.spacing(2),
    },
    featureList: {
      padding: theme.spacing(2),
    },
  }));
  
  const Features = () => {
    const classes = useStyles();
  }

  return (
    <div className="Home-header">
      <Header/>
      
      <Container component="section" maxWidth="lg" className={classes.root}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            <Typography variant="h5" component="h3" className={classes.title}>
              Explore Tokyo
            </Typography>
            <Typography className={classes.featureList}>
              Discover Tokyo like you never have before.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            <Typography variant="h5" component="h3" className={classes.title}>
              Eat Delicious Food
            </Typography>
            <Typography className={classes.featureList}>
              Find the best local restaurants and bars.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            <Typography variant="h5" component="h3" className={classes.title}>
              Visit the Best Spots
            </Typography>
            <Typography className={classes.featureList}>
              Check out some of the less known locations and attractions for tourists.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}
export default Home;