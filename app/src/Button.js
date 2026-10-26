import './Button.css';

function Button({
  children,
  className = '',
  color,
  padding,
  symbol,
  style,
  ...props
}) {
  const buttonStyle = {
    ...style,
    ...(color ? { color, borderColor: color } : {}),
    ...(padding ? { padding } : {}),
  };

  return (
    <button
      className={`button ${className}`.trim()}
      style={buttonStyle}
      {...props}
    >
      {symbol && <span className="button-symbol" aria-hidden="true">{symbol}</span>}
      {children}
    </button>
  );
}

export default Button;
