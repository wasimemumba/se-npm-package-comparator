import { Line } from "@ant-design/plots";
import React from "react";

const FormatDate = (date: string) => {
  const dateObject = new Date(date);

  dateObject.setFullYear(dateObject.getFullYear() - 1);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

type LineChartProps = {
  line1Name: string;
  Line1: {
    from: string;
    to: string;
    count: number;
  }[];
  line2Name: string;
  Line2: {
    from: string;
    to: string;
    count: number;
  }[];

  loading: boolean;
};

const LineChart: React.FC<LineChartProps> = ({
  Line1,
  Line2,
  line1Name,
  line2Name,
}) => {
  const data = [
    ...Line1.map((element) => {
      return {
        year: FormatDate(element.from),
        value: element.count,
        category: line1Name,
      };
    }),
    ...Line2.map((element) => {
      return {
        year: FormatDate(element.from),
        value: element.count,
        category: line2Name,
      };
    }),
  ];

  data.sort((a, b) => {
    const dateA = new Date(a.year);
    const dateB = new Date(b.year);
    return dateA.getTime() - dateB.getTime();
  });

  const config = {
    data,
    xField: "year",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 2,
    },
    colorField: "category",
    interaction: {
      tooltip: {
        marker: true,
      },
    },
    style: {
      lineWidth: 3,
    },
  };

  return <Line {...config} />;
};

export default LineChart;
