import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import AnalyticsResults from './AnalyticsResults'
import Grid from '@material-ui/core/Grid';
import '../../App.css'
const dateFormat = require('dateformat')
const now = new Date();

const use = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button:{
    backgroundColor:'#c89666',
    color:'white',
    border: '1px solid',
    borderColor: '#c89666',
    textTransform: 'none',
    width:200,
    '&:hover': {
      backgroundColor: '#c89666',
      borderColor: '#c89666',
      boxShadow: '#c89666',
    },
    '&:active': {
      boxShadow: '#c89666',
      backgroundColor: '#c89666',
      borderColor: '#c89666',
    }, '&:focus': {
      boxShadow: '#c89666',
      borderColor: '#c89666',
    },
  
  }
}));


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:theme.spacing(16)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  
  
}));
const Analytics = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const timeNow = dateFormat(now, "yyyy-mm-dd'T'HH:MM")
    const monthAgo= dateFormat(now.setMonth(now.getMonth() - 1),"yyyy-mm-dd'T'HH:MM")
    
    const classes = useStyles();
    const classe= use()
    const toSqlDate = (date) => (new Date(date)).toISOString().slice(0, 19).replace('T', ' ')
    const [chosenDate, setChosenDate] = useState({ from: `${monthAgo}`,to:`${timeNow}`});
    const [analytics,setAnalytics]=useState([])
    const handleChange = (e) => {
    const name = e.target.name;
    setChosenDate({ ...chosenDate, [name]: e.target.value });
  
    }
    console.log(chosenDate)
    const handelClick = async() => {
    const backAnalytics =  await props.users.analyticsSearch(props.users.loggedInUser.id,toSqlDate(chosenDate.from),toSqlDate(chosenDate.to))
    setAnalytics([...backAnalytics])
      }
    
  console.log(chosenDate)

    return (
      <div className={classes.root}>
      <Grid container 
            direction="column"
            justify="center"
            alignItems="center" spacing={3}>
      <Grid item xs={12}>
       <TextField
        id="datetime-local"
        label="From"
        type="datetime-local"
        name="from"
        defaultValue={chosenDate.from}
        onChange={handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       </Grid>
   <Grid item xs={12}>
         <TextField
        id="datetime-local"
        label="To"
        type="datetime-local"
        name="to"
        defaultValue={chosenDate.to}
        onChange={handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid>
       <Grid item xs={12}>
        <Button className={classe.button} onClick={handelClick} variant="contained" color="primary">Search</Button>
       </Grid>
        {analytics.map(a=><AnalyticsResults key={chosenDate.userId} income={a.income} expense={a.expense} ridesJoined={a.ridesJoined} carpools={a.carpools} />)}
        </Grid>
      </div>
    );
  })
);

export default Analytics;