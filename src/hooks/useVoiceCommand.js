import { useEffect, useRef, useState } from 'react';

const useVoiceCommand = (onCommand) => {
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript.toLowerCase();
      console.log('Voice Input:', speech);
      setSpeechText(speech);        // show speech on screen
      onCommand(speech);

      // Clear the speech text after 4 seconds
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSpeechText('');
      }, 4000);
    };

    recognition.onend = () => {
      // Stop after one session — no auto-restart
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onCommand]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return { isListening, toggleListening, speechText };
};

export default useVoiceCommand;
