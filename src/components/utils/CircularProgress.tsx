import "../../App.css";

const CircularProgress = ({
  className = "",
  color = "#06D6A0",
  width = "10em",
  height = "10em",
  duration = "2s",
  ...others
}) => {
  return (
    <svg
      {...others}
      crossOrigin='anonymous'
      viewBox='25 25 50 50'
      style={{
        width: width,
        height: height,
        color: color,
      /*   duration: duration, */
      }}
      className={`cssfx-circular-progress-svg ${className}`}>
      <circle
        className='cssfx-circular-progress-circle'
        cx='50'
        cy='50'
        r='20'></circle>
    </svg>
  );
};

export default CircularProgress;
