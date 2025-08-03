import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function RegionPieChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const regionCounts = d3.rollups(
      data,
      (v) => v.length,
      (d) => d.region || "Unknown"
    );

    const total = d3.sum(regionCounts, (d) => d[1]);

    const width = 750;
    const height = 350;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(regionCounts.map((d) => d[0]))
      .range(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d[1]);
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius - 10);

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px 8px")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("visibility", "hidden");

    const arcs = g.selectAll("arc").data(pie(regionCounts)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data[0]))
      .on("mouseover", function (event, d) {
        const percent = ((d.data[1] / total) * 100).toFixed(2);
        tooltip
          .style("visibility", "visible")
          .html(`${d.data[0]}: ${percent}%`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", `${event.pageY - 30}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      });

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .text((d) => d.data[0]);

    return () => tooltip.remove();
  }, [data]);

  return <svg ref={ref}></svg>;
}
