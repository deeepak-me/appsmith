import type { ForwardedRef, CSSProperties } from "react";
import React, { forwardRef } from "react";
import styled from "styled-components";
import { UpArrowSVG } from "./UpArrowIcon";
import { ErrorSVG } from "./ErrorIcon";

const styles: CSSProperties = {
  display: "inline-flex",
  height: "24px", // This is 2px more than the ones in the designs.
  width: "max-content",
  position: "fixed",
  top: 0,
  left: 0,
  visibility: "hidden",
  isolation: "isolate",
};

const SplitButtonWrapper = styled.div<{
  $BGCSSVar: string;
  $ColorCSSVar: string;
  $isLeftToggleDisabled: boolean;
  $isRightToggleDisabled: boolean;
}>`
  border-radius: var(--on-canvas-ui-border-radius);
  color: var(${(props) => props.$ColorCSSVar});
  fill: var(${(props) => props.$ColorCSSVar});
  stroke: var(${(props) => props.$ColorCSSVar});

  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  gap: 1px;

  & button {
    cursor: pointer;
    appearance: none;
    background: none;
    border: none;
    background: var(${(props) => props.$BGCSSVar});

    display: inline-flex;
    align-items: center;
    gap: 1ch;
    white-space: nowrap;

    font-family: inherit;
    font-size: inherit;
    font-weight: 500;

    padding-block: 1.25ch;
    padding-inline: 2ch;

    color: var(${(props) => props.$ColorCSSVar});
    outline-color: var(${(props) => props.$BGCSSVar});
    outline-offset: -5px;
    ${(props) =>
      props.$isLeftToggleDisabled &&
      "border-start-start-radius: var(--on-canvas-ui-border-radius); border-end-start-radius: var(--on-canvas-ui-border-radius);"}
    ${(props) =>
      props.$isRightToggleDisabled &&
      "border-end-end-radius: var(--on-canvas-ui-border-radius); border-start-end-radius: var(--on-canvas-ui-border-radius);"}
  }

  & span {
    inline-size: 3ch;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-inline-start: var(--on-canvas-ui-border-radius);
    border-start-start-radius: var(--on-canvas-ui-border-radius);
    border-end-start-radius: var(--on-canvas-ui-border-radius);
    background: var(${(props) => props.$BGCSSVar});
    color: var(${(props) => props.$ColorCSSVar});

    &:is(:hover, :focus-visible) {
      filter: brightness(0.8);
      color: var(${(props) => props.$ColorCSSVar});
      & > svg {
        stroke: currentColor;
        fill: none;
      }
    }

    &:active {
      filter: brightness(0.6);
    }
  }

  & > svg {
    stroke: var(${(props) => props.$ColorCSSVar});
  }

  & span:nth-of-type(${(props) => (props.$isLeftToggleDisabled ? 1 : 2)}) {
    border-inline-end: var(--on-canvas-ui-border-radius);
    border-start-start-radius: 0px;
    border-end-start-radius: 0px;
    border-end-end-radius: var(--on-canvas-ui-border-radius);
    border-start-end-radius: var(--on-canvas-ui-border-radius);
  }
`;

export function _SplitButton(
  props: {
    text: string;
    onClick: React.MouseEventHandler;
    bGCSSVar: string;
    colorCSSVar: string;
    leftToggle: {
      disable: boolean;
      onClick: React.MouseEventHandler;
      title: string;
    };
    rightToggle: {
      disable: boolean;
      onClick: React.MouseEventHandler;
      title: string;
    };
    onDragStart: React.DragEventHandler;
  },
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <SplitButtonWrapper
      $BGCSSVar={props.bGCSSVar}
      $ColorCSSVar={props.colorCSSVar}
      $isLeftToggleDisabled={props.leftToggle.disable}
      $isRightToggleDisabled={props.rightToggle.disable}
      draggable
      onDragStart={props.onDragStart}
      ref={ref}
      style={styles}
    >
      {!props.leftToggle.disable && (
        <span
          aria-expanded="false"
          aria-haspopup="true"
          onClick={props.leftToggle.onClick}
          title={props.leftToggle.title}
        >
          <UpArrowSVG />
        </span>
      )}
      <button onClick={props.onClick}>{props.text}</button>
      {!props.rightToggle.disable && (
        <span
          aria-expanded="false"
          aria-haspopup="true"
          onClick={props.rightToggle.onClick}
          title={props.rightToggle.title}
        >
          <ErrorSVG />
        </span>
      )}
    </SplitButtonWrapper>
  );
}

export const SplitButton = forwardRef(_SplitButton);