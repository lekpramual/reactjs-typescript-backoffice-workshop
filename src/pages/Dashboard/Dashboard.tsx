import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, ButtonGroup, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { useMatchedRouteApp } from "@/components/useMatchedRouteApp";

import "chart.js/auto";
export default function Dashboard() {
  const routeApp = useMatchedRouteApp();
  const [chartType, setChartType] = useState<string>("bar");
  const [chartData1, setChartData1] = useState([]);
  const [chartData2, setChartData2] = useState([]);

  function getRandomInt(): any {
    // let randoms = [];
    let randoms: any[] = [];
    for (let index = 0; index < 8; index++) {
      randoms.push(Math.floor(Math.random() * (50000 - 5 + 1)) + 5);
    }
    return randoms;
  }

  const data: any = {
    labels: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฏาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ],
    datasets: [
      {
        label: "รายได้ 2022",
        fill: false,
        lineTension: 0.1, // line curve
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 10, // circle
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData1,
      },
      {
        label: "รายได้ 2023",
        fill: false,
        lineTension: 0.1, // line curve
        borderWidth: 0.5, // line thiness
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(220,220,220,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 10, // circle
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(220,220,220,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData2,
      },
    ],
  };

  const chartOption: any = {
    plugins: {
      tooltip: {
        callbacks: {
          title: function () {
            return routeApp?.title;
          },
        },
      },
      legend: { display: true },
      title: {
        display: true,
        text: `ภาพรวม ${routeApp?.title}`,
        position: "top",
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          callback: function (value: any, index: any, values: any) {
            return "฿" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        },
      },
    },
  };

  useEffect(() => {
    setChartData1(getRandomInt());
    setChartData2(getRandomInt());
  }, []);

  return (
    <Paper sx={{ padding: 4 }}>
      {/* <Typography variant="h1">Sale Chart</Typography> */}
      <ButtonGroup
        size="large"
        color="primary"
        aria-label="large outlined primary button group"
      >
        <Button
          variant={chartType === "line" ? "contained" : "outlined"}
          onClick={() => setChartType("line")}
        >
          เส้น
        </Button>
        <Button
          variant={chartType === "bar" ? "contained" : "outlined"}
          onClick={() => setChartType("bar")}
        >
          แท่ง
        </Button>
        <Button
          variant={chartType === "pie" ? "contained" : "outlined"}
          onClick={() => setChartType("pie")}
        >
          วงกลม
        </Button>
      </ButtonGroup>
      <IconButton
        aria-label="refresh"
        onClick={() => {
          setChartData1(getRandomInt());
          setChartData2(getRandomInt());
        }}
      >
        <RefreshIcon />
      </IconButton>
      <div style={{ height: "55vh" }}>
        {chartType === "line" && (
          <Chart type={"line"} data={data} options={chartOption} />
        )}
        {chartType === "pie" && (
          <Chart type="pie" data={data} options={chartOption} />
        )}
        {chartType === "bar" && (
          <Chart type="bar" data={data} options={chartOption} />
        )}
      </div>
    </Paper>
  );
}
