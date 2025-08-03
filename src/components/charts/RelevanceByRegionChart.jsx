import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function PackedCircleChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const grouped = d3
      .rollups(
        data.filter((d) => d.region),
        (v) => d3.sum(v, (d) => d.relevance || 0),
        (d) => d.region
      )
      .map(([region, relevance]) => ({ name: region, value: relevance }));

    const root = d3.hierarchy({ children: grouped }).sum((d) => d.value);

    const width = 750;
    const height = 350;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    d3.select(ref.current).selectAll("*").remove();

    const container = d3.select(ref.current).style("position", "relative");

    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const tooltip = container
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.75)")
      .style("color", "#fff")
      .style("padding", "6px 12px")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "14px")
      .style("opacity", 0);

    const pack = d3.pack().size([width, height]).padding(3);
    const nodes = pack(root).leaves();

    const node = svg
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", (d) => d.r)
      .style("fill", (d) => color(d.data?.name))
      .style("opacity", 0.85)
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(
            `<strong>${d.data.name}</strong><br/>Relevance: ${d.data?.value}`
          )
          .style("left", `${event.offsetX + 10}px`)
          .style("top", `${event.offsetY - 40}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.offsetX + 10}px`)
          .style("top", `${event.offsetY - 40}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(300).style("opacity", 0);
      });

    node
      .append("text")
      .text((d) => d.data?.name)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("pointer-events", "none")
      .style("font-size", (d) => Math.min((2 * d.r) / d.data?.name?.length, 14))
      .attr("dy", "0.3em");
  }, [data]);

  return <div ref={ref}></div>;
}
