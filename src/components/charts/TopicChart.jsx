import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function TopicBarChart({ data }) {
  const ref = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Filter valid end_year entries
    const filteredData = data.filter((d) => d.end_year && !isNaN(+d.end_year));

    // Group by year and collect associated topics
    const yearMap = d3
      .rollups(
        filteredData,
        (v) => ({
          count: v.length,
          topics: v.map((d) => d.topic).filter(Boolean),
        }),
        (d) => d.end_year.toString()
      )
      .sort((a, b) => +a[0] - +b[0]);

    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const width = 750;
    const height = 350;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select(tooltipRef.current);
    tooltip.style("position", "absolute").style("visibility", "hidden");

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(yearMap.map((d) => d[0]))
      .range([0, width - margin.left - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(yearMap, (d) => d[1].count)])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Y Axis
    g.append("g").call(d3.axisLeft(y));

    // Bars
    g.selectAll("rect")
      .data(yearMap)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d[1].count))
      .attr("width", x.bandwidth())
      .attr(
        "height",
        (d) => height - margin.top - margin.bottom - y(d[1].count)
      )
      .attr("fill", "orange")
      .on("mouseover", (event, d) => {
        const topics = d[1].topics.slice(0, 5).join(", ");
        tooltip
          .style("visibility", "visible")
          .text(`Year: ${d[0]} | Topics: ${topics || "No Topic"}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", event.pageY - 40 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  }, [data]);

  return (
    <>
      <svg ref={ref}></svg>
      <div
        ref={tooltipRef}
        style={{
          background: "rgba(0,0,0,0.85)",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: "4px",
          fontSize: "13px",
          pointerEvents: "none",
          position: "absolute",
          zIndex: 10,
        }}
      />
    </>
  );
}
