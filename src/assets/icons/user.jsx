export function UserIcon({ color, size }) {

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12.7 12.7"
      version="1.1"
      id="userIcon"
    >
      <path
        id="mainIcon"
        style={{ fill: `rgba(var(${color}))` }}
        d="M 6.35,0.79375 A 3.7041667,3.7041667 0 0 1 10.054167,4.4979167 3.7041667,3.7041667 0 0 1 6.35,8.2020833 Z M 9.5492879,7.2703573 A 6.0854168,6.0854168 0 0 1 12.435417,12.435417 6.0854168,6.0854168 0 0 1 12.416296,12.7 H 6.35 V 8.73125 A 4.2333331,4.2333331 0 0 0 9.5492879,7.2703573 Z"
      />
      <path
        id="colorIcon"
        style={{ fill: `rgba(var(${color}), .6)` }}
        d="M 6.35 0.79375 A 3.7041667 3.7041667 0 0 0 2.6458333 4.4979167 A 3.7041667 3.7041667 0 0 0 6.35 8.2020833 L 6.35 0.79375 z M 3.1507121 7.2703573 A 6.0854168 6.0854168 0 0 0 0.26458333 12.435417 A 6.0854168 6.0854168 0 0 0 0.28370361 12.7 L 6.35 12.7 L 6.35 8.73125 A 4.2333331 4.2333331 0 0 1 3.1507121 7.2703573 z "
      />
    </svg>
  );
};

