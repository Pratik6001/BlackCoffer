import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function AreaChartByYear({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // 📊 Filter and preprocess data
    const filtered = data
      .filter((d) => d.end_year && !isNaN(+d.end_year))
      .map((d) => ({
        end_year: +d.end_year,
        intensity: d.intensity || 0,
      }));

    const grouped = Array.from(
      d3.rollup(
        filtered,
        (v) => d3.sum(v, (d) => d.intensity),
        (d) => d.end_year
      ),
      ([year, intensity]) => ({ year, intensity })
    ).sort((a, b) => a.year - b.year);

    const margin = { top: 50, right: 30, bottom: 50, left: 60 };
    const width = 750;
    const height = 350;

    d3.select(ref.current).selectAll("*").remove();
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(grouped, (d) => d.year))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(grouped, (d) => d.intensity)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const area = d3
      .area()
      .x((d) => x(d.year))
      .y0(y(0))
      .y1((d) => y(d.intensity))
      .curve(d3.curveMonotoneX);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Area Path
    svg
      .append("path")
      .datum(grouped)
      .attr("fill", "#69b3a2")
      .attr("stroke", "#40916c")
      .attr("stroke-width", 2)
      .attr("d", area);

    // Chart Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Total Intensity by End Year");

    // Y Axis Label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .text("Total Intensity");

    // X Axis Label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .text("End Year");
  }, [data]);

  return <div ref={ref}></div>;
}
