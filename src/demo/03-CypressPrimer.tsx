import React from "react";

export type CypressPrimerProps = {
  step: number;
};

export const CypressPrimer: React.FC<CypressPrimerProps> = (props) => {
  const [value, setValue] = React.useState(1);

  const increment = () => setValue(value + props.step);
  const decrement = () => setValue(value - props.step);

  return (
    <div>
      <div>
        <input id="value-input" value={value} />
      </div>

      <div id="value-display">This number is {value}</div>

      <div>
        <button id="decrement" onClick={decrement}>
          -
        </button>
        <button id="increment" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};
