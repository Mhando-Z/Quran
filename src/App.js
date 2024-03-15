import "./App.css";
import { Stack } from "@mui/material";
import { QuranRead } from "./Components/collect";

function App() {
  return (
    <div className="App">
      <Stack direction="column" spacing={7}>
        <QuranRead />
      </Stack>
    </div>
  );
}

export default App;
