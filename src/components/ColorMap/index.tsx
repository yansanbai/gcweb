import React, { createRef, useEffect, useRef } from "react";

const colorRampList = [
  {
    id: "colorRamp-1",
    colorRamp: [
      "#00939C",
      "#65B3BA",
      "#A2D4D7",
      "#C1E6C6",
      "#F5B097",
      "#E17449",
      "#C22E00",
      "#8B0000",
    ],
  },
  {
    id: "colorRamp-2",
    colorRamp: [
      "#FFFACD",
      "#EAD98A",
      "#CABB43",
      "#99A70A",
      "#5F9304",
      "#408812",
      "#086D25",
      "#0A4F27",
    ],
  },
  {
    id: "colorRamp-3",
    colorRamp: [
      "#8B4513",
      "#B35806",
      "#F1A340",
      "#FEE0B6",
      "#C1E6C6",
      "#FCD583",
      "#998EC3",
      "#542788",
    ],
  },
  {
    id: "colorRamp-4",
    colorRamp: [
      "#8C510A",
      "#D8B365",
      "#C1E6C6",
      "#E7D4E8",
      "#C1E6C6",
      "#5AB4AC",
      "#01665E",
      "#2F4F4F",
    ],
  },
  {
    id: "colorRamp-5",
    colorRamp: [
      "#762A83",
      "#AF8DC3",
      "#E7D4E8",
      "#C1E6C6",
      "#C1E6C6",
      "#00FA9A",
      "#7FBF7B",
      "#1B7837",
    ],
  },
  {
    id: "colorRamp-6",
    colorRamp: [
      "#FFF0F5",
      "#ffc6c4",
      "#f4a3a8",
      "#e38191",
      "#cc607d",
      "#ad466c",
      "#8b3058",
      "#672044",
    ],
  },
  {
    id: "colorRamp-7",
    colorRamp: [
      "#00985C",
      "#72BA76",
      "#C1DA97",
      "#FFFCC2",
      "#FCC478",
      "#F9833D",
      "#EF231A",
      "#B22222",
    ],
  },
  {
    id: "colorRamp-8",
    colorRamp: [
      "#e4f1e1",
      "#b4d9cc",
      "#89c0b6",
      "#63a6a0",
      "#448c8a",
      "#287274",
      "#0d585f",
      "#074050",
    ],
  },
  {
    id: "colorRamp-9",
    colorRamp: [
      "#F0FFF0",
      "#d3f2a3",
      "#97e196",
      "#6cc08b",
      "#4c9b82",
      "#217a79",
      "#105965",
      "#074050",
    ],
  },
  {
    id: "colorRamp-10",
    colorRamp: [
      "#b0f2bc",
      "#89e8ac",
      "#67dba5",
      "#4cc8a3",
      "#38b2a3",
      "#2c98a0",
      "#257d98",
      "#105965",
    ],
  },
];

const ColorRamp = (props) => {
  const { width, height, colorRamp } = props;
  const colorRef = useRef();

  useEffect(() => {
    drawColorRamp();
  }, []);

  // 绘制色带条
  const drawColorRamp = () => {
    let c = colorRef?.current;
    let ctx = c?.getContext("2d");
    colorRampList.map((item, index) => {
      ctx.fillStyle = item;
      ctx.fillRect(
        10 + width * index,
        6 - height / 2,
        width,
        12 + height * 1.5
      );
    });
  };

  return (
    <canvas
      ref={colorRef}
      height={21}
      style={{ width: "98%", marginTop: "4px", marginBottom: "2px" }}
    ></canvas>
  );
};

export default ColorRamp;
