import "./App.css";
import appService from "./services/applications";
import { useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import List from "./components/List";
import PageHeader from "./components/PageHeader";
import Search from "./components/Search";
import Navbar from "./components/Navbar";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#fdfdff"
    },
  }
});


function App() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    appService.getItems().then((resp) => {
      setApplications(resp);
    });
  }, []);

  const addItem = (newItem) => {
    appService.create(newItem).then((returnedItem) => {
      setApplications([...applications, returnedItem]);
    });
  };

  const removeItem = (id) => {
    const toDelete = applications.find((app) => app.id === id);
    const isOk = window.confirm(`Delete ${toDelete.company}?`);
    if (isOk) {
      appService.remove(id).then((resp) => {
        setApplications(applications.filter((app) => app.id !== id));
      });
    }
  };

  const filteredItems =
    search.length === 0
      ? applications
      : applications.filter((app) =>
          app.company.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
        <PageHeader /> 
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        <List applications={filteredItems} remove={removeItem} addItem={addItem}/>
    </ThemeProvider>
  );
}

export default App;
