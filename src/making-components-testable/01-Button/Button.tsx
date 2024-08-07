import "./Button.css";

export type ButtonProps = {
  label: string;
  type: "success" | "warning" | "neutral";
  icon?: "tick" | "cross" | "pencil";
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = (props) => {
  if (props.icon) {
    return (
      <button
        className={props.type}
        aria-label={props.label}
        onClick={props.onClick}
      >
        {props.icon === "tick" ? "✔️" : props.icon === "cross" ? "❌" : "✏️"}
      </button>
    );
  }

  return <button className={props.type}>{props.label}</button>;
};
