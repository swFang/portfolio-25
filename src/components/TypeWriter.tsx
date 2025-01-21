import { useEffect, useState } from "react";
import "./TypeWriter.css";

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

const TypeWriter = ({ text, speed = 0.5, delay = 0 }: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const startTyping = () => {
      let currentText = "";
      let currentChar = 0;
      const totalChars = text.length;

      const interval = setInterval(() => {
        if (currentChar < totalChars) {
          currentText += text[currentChar];
          setDisplayedText(currentText);
          currentChar++;
        } else {
          clearInterval(interval);
        }
      }, 1000 / (totalChars * speed));

      return interval;
    };

    const timeout = setTimeout(() => {
      const interval = startTyping();
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return <div className='typewriter'>{displayedText}</div>;
};

export default TypeWriter;
