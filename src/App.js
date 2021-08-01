import './App.css';
import {
    BrowserRouter
} from "react-router-dom";
import RouterConfig from './services/Router';

function App() {
  return (
      <>
          <BrowserRouter>
              <RouterConfig />
          </BrowserRouter>
      </>
  );
}

export default App;
