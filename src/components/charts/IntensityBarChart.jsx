import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function IntensityByYearChart({ data }) {
  const ref = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Group by end_year and sum intensity
    const grouped = d3
      .rollups(
        data.filter((d) => d.end_year && !isNaN(+d.end_year)),
        (v) => d3.sum(v, (d) => d.intensity || 0),
        (d) => +d.end_year
      )
      .map(([year, intensity]) => ({ year, intensity }))
      .sort((a, b) => a.year - b.year); // Ensure years are sorted

    const width = 750,
      height = 350,
      margin = { top: 20, right: 20, bottom: 60, left: 60 };

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
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "#fff")
      .style("padding", "6px 10px")
      .style("border-radius", "4px")
      .style("font-size", "13px")
      .style("pointer-events", "none")
      .style("z-index", 10);

    const x = d3
      .scaleBand()
      .domain(grouped.map((d) => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(grouped, (d) => d.intensity)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // X-axis (Years)
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")))
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end");

    // Y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("rect")
      .data(grouped)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.year))
      .attr("y", (d) => y(d.intensity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.intensity))
      .attr("fill", "#4682b4")
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .text(`Year: ${d.year}, Intensity: ${d.intensity}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY - 30}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold");
  }, [data]);

  return (
    <>
      <div ref={ref}></div>
      <div ref={tooltipRef} />
    </>
  );
}
