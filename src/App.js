import {useEffect, useState} from 'react'; 
import {makeStyles} from '@material-ui/styles';
import axios from 'axios'; 
import Navbar from './components/Navbar'; 
import List from './components/List'; 
import AddItem from './components/AddItem';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    fontFamily: 'Abel',
    alignItems: 'center',
    textAlign: 'center', 
  },
});

function App() {
  const classes = useStyles();
  const [applications, setApplications] = useState([]); 

  useEffect(() => {
    axios
      .get('http://localhost:3001/applications')
      .then(resp => {
        const data = resp.data
        setApplications(data)
      })
  }, [])

 
  const addItem = (newItem) => {
    axios
      .post('http://localhost:3001/applications', newItem)
      .then(resp => {
        setApplications([...applications, resp.data]) 
      })
  }

  return (
    <Container className={classes.root}>
        <Navbar /> 
        <List applications={applications}/> 
        <AddItem addItem={addItem}/>  
    </Container> 
  );
}

export default App;
