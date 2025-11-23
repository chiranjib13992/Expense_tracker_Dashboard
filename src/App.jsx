import { useEffect } from 'react'
import AppRouting from './AppRouting';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'

function App() {
  useEffect(()=>{ 

  }, []);
  return (
    <>
    <Router>
      <AppRouting />
    </Router>
    </>
  );
}

export default App
