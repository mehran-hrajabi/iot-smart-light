import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './_voiceCommand.scss';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const microphone = new SpeechRecognition();

microphone.lang = 'en-US';
microphone.continuous = true;
microphone.interimResults = true;

const VoiceCommand = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening]);

  const handleListen = () => {
    if (isListening) microphone.start();
    else microphone.stop();

    microphone.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setNote(transcript);
    }
    setSavedNotes([...savedNotes, note]);
    setNote('');
  }
  
  useEffect(() =>{
    //Cause side effects here
    //console.log(savedNotes);
    axios.post('/voice',savedNotes)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  });

    return(
        <div className="voiceCommand">
            <h1>Voice command</h1>
            <p>Press the button to enable/disable your microphone.</p>
            <button onClick={() => setIsListening(prevState => !prevState)}>Start/Stop</button>
            {isListening ? <p>🎙️Your microphone is on...</p> : <p>🛑Your microphone is off.</p>}
        </div>
    );
}

export default VoiceCommand;