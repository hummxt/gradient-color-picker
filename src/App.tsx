import { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faCopy} from '@fortawesome/free-solid-svg-icons';


function App() {
  const [color, setColor] = useState("white");
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [angle, setAngle] = useState(90);
  const [gradient, setGradient] = useState("");

  const toggleColor = () => {
    setColor(prevColor => prevColor === "white" ? "rgb(33, 33, 33)" : "white");
  };

  useEffect(() => {
    document.body.style.background = color;
  }, [color]);

  useEffect(() => {
    const gradientString = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    setGradient(gradientString);
  }, [color1, color2, angle]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const rgbColor = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <>
      <div className="container">
        <header>
          <a href="#" className="logo">Gradient Color Picker</a>
          <a href="#" className="dark-mode-icon" onClick={toggleColor}>
            <FontAwesomeIcon icon={faMoon} />
          </a>
        </header>
        <div className="gradient-section">
          {/* <h1>Gradient colorunu duzelt</h1> */}
          <div
            className="gradient-preview"
            style={{ background: gradient }}
          />
          <div className="gradient-color">
            <div className="gradient-picker">
              <div className="angle">
              <div className="color-picker">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
              />
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
              />
              </div>
                <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className='round-input'
              />

              <p>{angle}°</p>
              <div className="picker-copy">
                <a onClick={() => handleCopy(`background: ${gradient};`)}>
                  <FontAwesomeIcon icon={faCopy} /> Copy
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
