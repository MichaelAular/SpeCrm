export function Edit({ color, size }) {
  return(
    <svg
      width={size}
      height={size}
      viewBox="0 0 12.7 12.7"
      version="1.1"
      id="arrow_up"
    >
      <path
        style={{ fill: `${color}` }}
        d="M 1.8267619 0 C 0.81484607 0 -6.2665859e-16 0.81484607 0 1.8267619 L 0 10.873238 C 0 11.885154 0.81484607 12.7 1.8267619 12.7 L 10.873238 12.7 C 11.885154 12.7 12.7 11.885154 12.7 10.873238 L 12.7 4.490682 L 11.641667 5.5490153 L 11.641667 10.119279 C 11.641667 10.962542 10.962542 11.641667 10.119279 11.641667 L 2.580721 11.641667 C 1.737458 11.641667 1.0583333 10.962542 1.0583333 10.119279 L 1.0583333 2.580721 C 1.0583333 1.737458 1.737458 1.0583333 2.580721 1.0583333 L 7.1282471 1.0583333 L 8.1865804 0 L 1.8267619 0 z M 10.449491 0 C 10.311196 0 10.173045 0.053204982 10.067086 0.15916341 L 9.9601156 0.26561686 L 9.8009521 0.42478027 L 9.4185465 0.80718587 L 9.8009521 1.1895915 L 11.510409 2.8990479 L 11.892814 3.2814535 L 12.27522 2.8990479 L 12.434383 2.7398844 L 12.540837 2.6329142 C 12.752754 2.4209974 12.752754 2.0800199 12.540837 1.868103 L 10.831897 0.15916341 C 10.725939 0.053204982 10.587787 0 10.449491 0 z M 9.0061686 1.2195638 L 3.8519613 6.3737712 L 6.3262288 8.8480387 L 11.480436 3.6938314 L 9.0061686 1.2195638 z M 3.4395833 6.7861491 L 3.4395833 9.2604167 L 5.9138509 9.2604167 L 3.4395833 6.7861491 z "
      />
    </svg>
  )
};