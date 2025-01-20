import { useEffect, useState } from "react";
import "./TypeWriter.css";

interface TypeWriterProps {
  text: string;
  speed?: number;
}

const TypeWriter = ({ text, speed = 0.5 }: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const paragraphs = text.split("\n\n");
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
    }, 1000 / (totalChars * speed)); // Adjust speed to complete in roughly 1s

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className='typewriter'>
      {displayedText.split("\n\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default TypeWriter;
