import React from "react";
import Lottie from "react-lottie";

export default function LottieAnimation({ lotti, width, height,play }) {
  const defaultOptions = {
    loop: play,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions}   isClickToPauseDisabled={true} height={height} width={width} />
    </div>
  );
};