import { useMutation, useStorage } from "@liveblocks/react";
import React, { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

import {
  EDITOR_PAGE_SIZE,
  LEFT_MARGIN,
  RIGHT_MARGIN,
  RULER_MAXIMUM_SPACE,
} from "@/features/documents/core/constants";

const markers = Array.from({ length: 83 }, (_, i) => i);

const Ruler = () => {
  const leftMargin = useStorage((root) => root.leftMargin) ?? LEFT_MARGIN;
  const setLeftMargin = useMutation(({ storage }, position: number) => {
    storage.set("leftMargin", position);
  }, []);
  const rightMargin = useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN;
  const setRightMargin = useMutation(({ storage }, position: number) => {
    storage.set("rightMargin", position);
  }, []);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => setIsDraggingLeft(true);
  const handleRightMouseDown = () => setIsDraggingRight(true);

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rowPosition = Math.max(0, Math.min(EDITOR_PAGE_SIZE, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition =
            EDITOR_PAGE_SIZE - leftMargin - RULER_MAXIMUM_SPACE;
          const newLeftPosition = Math.min(rowPosition, maxLeftPosition);

          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition =
            EDITOR_PAGE_SIZE - (leftMargin + RULER_MAXIMUM_SPACE);
          const newRightPosition = Math.max(EDITOR_PAGE_SIZE - rowPosition, 0);
          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition
          );

          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => setLeftMargin(86);

  const handleRightDoubleClick = () => setLeftMargin(86);

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-816 h-6 relative mx-auto flex items-end select-none border-b border-gray-300 print:hidden"
    >
      <div id="ruler-container" className="size-full relative">
        <Marker
          position={leftMargin}
          isLeft
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute bottom-0 h-full inset-x-0">
          <div className="w-816 h-full relative">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 transform -translate-x-1/2 text-[10px] text-neutral-500">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-10 w-[1px] h-1.5 bg-neutral-500" />
                  )}
                  {marker % 5 !== 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ruler;

interface IMarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: IMarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full z-[5] cursor-ew-resize group -ml-2"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute top-0 left-1/2 h-full transform -translate-x-1/2 fill-blue-500" />
      <div
        className="absolute top-4 left-1/2 transform -translate-x-1/2"
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "#3b72f6",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};
