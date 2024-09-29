import logo from './logo.svg';
import './App.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
