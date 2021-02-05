import './App.scss';
import Manual from './components/ManualHandler/ManualHandler';
import Auto from './components/AutoHandler/AutoHandler';
import Command from './components/VoiceCommand/VoiceCommand';

function App() {
  return (
    <div className="app">
      <Manual />
      <Auto />
      <Command />
    </div>
  );
}

export default App;