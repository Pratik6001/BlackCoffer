import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function LineChartByYear({ data }) {
  const ref = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // 🧹 Filter valid years and group by year
    const grouped = d3
      .rollups(
        data.filter((d) => d.end_year && !isNaN(+d.end_year)),
        (v) => d3.sum(v, (d) => d.likelihood || 0),
        (d) => +d.end_year
      )
      .sort(([a], [b]) => a - b)
      .map(([year, likelihood]) => ({ year, likelihood }));

    const width = 750;
    const height = 350;
    const margin = { top: 30, right: 30, bottom: 40, left: 60 };

    d3.select(ref.current).selectAll("*").remove();
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "#333")
      .style("color", "#fff")
      .style("padding", "6px 10px")
      .style("border-radius", "5px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("box-shadow", "0 2px 8px rgba(0,0,0,0.2)");

    const x = d3
      .scaleLinear()
      .domain(d3.extent(grouped, (d) => d.year))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(grouped, (d) => d.likelihood)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(d.year))
      .y((d) => y(d.likelihood));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append("path")
      .datum(grouped)
      .attr("fill", "none")
      .attr("stroke", "#007bff")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .selectAll("circle")
      .data(grouped)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.likelihood))
      .attr("r", 4)
      .attr("fill", "#007bff")
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .text(`Year: ${d.year}, Likelihood: ${d.likelihood}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY - 40}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  }, [data]);

  return (
    <>
      <div ref={ref}></div>
      <div ref={tooltipRef}></div>
    </>
  );
}
