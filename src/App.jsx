import './App.css';
import RoutesAll from './components/RoutesAll';
import { Toaster } from 'sonner';

function App() {

  return (
    <>
      <Toaster position="top-right" richColors />
      <RoutesAll />
    </>
  )
}

export default App
