export function Save({ color, size }) {
   return(
     <svg
       width={size}
       height={size}
       viewBox="0 0 12.7 12.7"
       version="1.1"
       id="add"
     >
       <path
         style={{ fill: `${color}` }}
         d="M 1.3192993 0 C 0.58848709 0 1.5666465e-16 0.58848709 0 1.3192993 L 0 11.380701 C 0 12.111513 0.58848709 12.7 1.3192993 12.7 L 11.380701 12.7 C 12.111513 12.7 12.7 12.111513 12.7 11.380701 L 12.7 2.6458333 L 10.054167 0 L 9.7895833 0 L 9.7895833 2.6949259 C 9.7895833 2.9610147 9.5755979 3.175 9.3095093 3.175 L 2.3321574 3.175 C 2.0660688 3.175 1.8520833 2.9610147 1.8520833 2.6949259 L 1.8520833 0 L 1.3192993 0 z M 8.5348796 0.26458333 C 8.3638222 0.26458333 8.2263713 0.40255106 8.2263713 0.5736084 L 8.2263713 2.3368083 C 8.2263713 2.5078656 8.3638222 2.6458333 8.5348796 2.6458333 L 8.9756795 2.6458333 C 9.1467369 2.6458333 9.2847046 2.5078656 9.2847046 2.3368083 L 9.2847046 0.5736084 C 9.2847046 0.40255106 9.1467369 0.26458333 8.9756795 0.26458333 L 8.5348796 0.26458333 z M 2.3631632 6.523116 L 10.336837 6.523116 C 10.619904 6.523116 10.847917 6.751127 10.847917 7.034196 L 10.847917 9.9528809 C 10.847917 10.23595 10.619904 10.463961 10.336837 10.463961 L 2.3631632 10.463961 C 2.0800944 10.463961 1.8520833 10.23595 1.8520833 9.9528809 L 1.8520833 7.034196 C 1.8520833 6.751127 2.0800944 6.523116 2.3631632 6.523116 z "
         />
     </svg>
   )
 };