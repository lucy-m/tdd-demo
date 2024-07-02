import React, { useEffect } from "react";
import "./03-CoolCalc.css";

export const CoolCalc: React.FC = () => {
  const [value1, setValue1] = React.useState<number | undefined>();
  const [value2, setValue2] = React.useState<number | undefined>();

  const [activeInput, setActiveInput] = React.useState<1 | 2 | undefined>(1);
  const input1 = React.useRef<HTMLInputElement | null>();
  const input2 = React.useRef<HTMLInputElement | null>();

  const setValue = (value: number) => () => {
    if (activeInput === 1) {
      setValue1(value);
      setValue2(undefined);
      setActiveInput(2);
    } else if (activeInput === 2) {
      setValue2(value);
      setActiveInput(1);
    }
  };

  useEffect(() => {
    if (activeInput === 1) {
      input1.current?.focus();
    } else if (activeInput === 2) {
      input2.current?.focus();
    }
  }, [activeInput]);

  return (
    <div className="coolcalc">
      <h1>CoolCalc</h1>
      <div className="display">
        <input
          readOnly
          ref={(e) => {
            input1.current = e;
          }}
          onFocus={() => {
            setActiveInput(1);
          }}
          value={value1 ?? ""}
        />
        +
        <input
          readOnly
          ref={(e) => {
            input2.current = e;
          }}
          onFocus={() => {
            setActiveInput(2);
          }}
          value={value2 ?? ""}
        />
        =
        <input
          readOnly
          value={
            value1 !== undefined && value2 !== undefined ? value1 + value2 : ""
          }
        />
      </div>
      <div className="buttons">
        <div>
          <button onClick={setValue(1)}>1</button>
          <button onClick={setValue(2)}>2</button>
          <button onClick={setValue(3)}>3</button>
        </div>
        <div>
          <button onClick={setValue(4)}>4</button>
          <button onClick={setValue(5)}>5</button>
          <button onClick={setValue(6)}>6</button>
        </div>
        <div>
          <button onClick={setValue(7)}>7</button>
          <button onClick={setValue(8)}>8</button>
          <button onClick={setValue(9)}>9</button>
        </div>
        <div>
          <button onClick={setValue(0)}>0</button>
        </div>
      </div>
    </div>
  );
};
