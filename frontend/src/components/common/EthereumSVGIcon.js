import React from 'react'

export const EthereumSVGIcon = () => {
  return (
    <span>
      <svg
        className="ether"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 226.777 226.777"
      >
        <path d="M112.553 157V86.977l-68.395 29.96zm0-74.837V-.056L46.362 111.156zM116.962-.09v82.253l67.121 29.403zm0 87.067v70.025l68.443-40.045zm-4.409 140.429v-56.321L44.618 131.31zm4.409 0l67.935-96.096-67.935 39.775z" />
      </svg>
      {/*language=CSS*/}
      <style>{`
        .ether { fill: darkgray; }
      `}</style>
    </span>
  )
}

export default EthereumSVGIcon
