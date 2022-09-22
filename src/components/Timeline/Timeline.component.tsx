import clsx from "clsx";
import dayjs from "dayjs";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { TimeEntity } from "src/api/types/time.type";
import { Typography } from "../Typography/Typography.component";
import style from "./Timeline.module.css";

export interface TimelineP {
  time?: TimeEntity[];
}

export const Timeline = ({ time }: TimelineP) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svgSize, setSvgSize] = useState<DOMRect>();

  const startTime = dayjs(time?.[0]?.time);
  const endTime = dayjs(time?.[time?.length - 1]?.time);
  const endOfLine = (svgSize?.width || 20) * 0.8;
  const svgHalf = (svgSize?.height ?? 0) / 2;
  const lineStart = (svgSize?.width || 20) * 0.2;

  const handleResize = () => {
    setSvgSize(() => {
      const size = svgRef?.current?.getClientRects();
      return size?.[0];
    });
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [time]);

  const getXPos = useCallback(
    (timestamp: number) => {
      const pos =
        ((timestamp - startTime.unix()) * 100) /
        (endTime.unix() - startTime.unix());

      const x = (pos / 100) * (svgSize?.width || 20) * 0.6 + lineStart
      return x > 0 ? x : 0;
    },
    [svgSize]
  );

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <svg ref={svgRef} className={style.svg}>
          <line
            className={style.line}
            stroke="currentColor"
            x1={lineStart}
            x2={endOfLine}
            y1={svgHalf}
            y2={svgHalf}
          />
          {!!time?.length &&
            time.map((e, i) => (
              <foreignObject
                className={clsx(style.circleWrapper)}
                key={`time-point${i}`}
                x={getXPos(dayjs(e.time).unix())}
                y={svgHalf}
                fill="currentColor"
              >
                <div
                  className={clsx(style.circle, {
                    [style.stop]: e.state === "stop",
                  })}
                >
                  <div className={style.popup}>
                    <Typography>{e.title}</Typography>
                    <Typography className={style.state}>{e.state}</Typography>
                    <Typography>{dayjs(e.time).format("HH:mm:ss")}</Typography>
                  </div>
                </div>
              </foreignObject>
            ))}
          <text color="currentColor" x={lineStart} y={svgHalf * 1.5}>
            {startTime.format("HH:mm")}
          </text>
          <text color="currentColor" x={endOfLine - 25} y={svgHalf * 1.5}>
            {endTime.format("HH:mm")}
          </text>
        </svg>
      </div>
    </div>
  );
};
