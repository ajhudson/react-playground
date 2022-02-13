import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export type FadeInHook = {
  fadeIn: boolean;
  toggleFadeHandler: () => void;
};

export const useFadeIn = (): FadeInHook => {
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  const toggleFadeHandler = () => {
    setFadeIn((prevValue) => !prevValue);
  };

  return {
    fadeIn,
    toggleFadeHandler,
  };
};

interface FaderProps {
  children: JSX.Element | JSX.Element[] | string;
  fadeIn: boolean;
  onFadeStart?: () => void;
  onFading?: () => void;
  onFadeEnd?: () => void;
}

const FaderContainer = styled("div")({
  opacity: 0,
  transition: "opacity 3s",
});

const Fader: FC<FaderProps> = ({
  children,
  fadeIn,
  onFadeStart,
  onFading,
  onFadeEnd,
}): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  const onFadeStartEvent = () => onFadeStart && onFadeStart();
  const onFadingEvent = () => onFading && onFading();
  const onFadeEndEvent = () => onFadeEnd && onFadeEnd();

  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.addEventListener(
        "transitionstart",
        onFadeStartEvent
      );
      containerRef.current.addEventListener("transitionrun", onFadingEvent);
      containerRef.current.addEventListener("transitionend", onFadeEndEvent);
    }

    return () => {
      const cRef = containerRef;
      if (cRef) {
        cRef.current?.removeEventListener("transitionstart", onFadeStartEvent);
        cRef.current?.removeEventListener("transitionrun", onFadingEvent);
        cRef.current?.removeEventListener("transitionend", onFadeEndEvent);
      }
    };
  }, []);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const opacityValue = fadeIn ? "1" : "0";
      containerRef.current.style.opacity = opacityValue;
    }
  }, [fadeIn]);

  return <FaderContainer ref={containerRef}>{children}</FaderContainer>;
};

export default Fader;
