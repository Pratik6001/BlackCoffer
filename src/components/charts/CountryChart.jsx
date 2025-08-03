import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function CountryGrid({ data }) {
  const ref = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    d3.select(ref.current).selectAll("*").remove();
    d3.select(tooltipRef.current).style("opacity", 0);

    const countryMap = new Map();
    data.forEach((d) => {
      if (!d.country) return;
      const country = d.country.trim();
      const entry = countryMap.get(country) || {
        totalIntensity: 0,
        totalLikelihood: 0,
        totalRelevance: 0,
        count: 0,
      };

      entry.totalIntensity += parseFloat(d.intensity) || 0;
      entry.totalLikelihood += parseFloat(d.likelihood) || 0;
      entry.totalRelevance += parseFloat(d.relevance) || 0;
      entry.count += 1;

      countryMap.set(country, entry);
    });

    const countries = Array.from(countryMap.keys());
    const intensities = countries.map(
      (c) => countryMap.get(c).totalIntensity || 0
    );
    const maxIntensity = d3.max(intensities) || 1;

    const colorScale = d3
      .scaleSequential(d3.interpolateOrRd)
      .domain([0, maxIntensity]);

    const width = 750;
    const height = 350;
    const boxSize = 80;
    const columns = Math.floor(width / boxSize);
    const rows = Math.ceil(countries.length / columns);
    const contentHeight = rows * boxSize;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", contentHeight);

    svg
      .selectAll("rect")
      .data(countries)
      .enter()
      .append("rect")
      .attr("x", (_, i) => (i % columns) * boxSize)
      .attr("y", (_, i) => Math.floor(i / columns) * boxSize)
      .attr("width", boxSize - 4)
      .attr("height", boxSize - 4)
      .attr("fill", (d) => colorScale(countryMap.get(d).totalIntensity))
      .attr("stroke", "#999")
      .on("mouseover", (event, d) => {
        const { totalIntensity, totalLikelihood, totalRelevance, count } =
          countryMap.get(d);

        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d}</strong><br/>
Intensity: ${totalIntensity}<br/>
Likelihood: ${totalLikelihood}<br/>
Relevance: ${totalRelevance}<br/>
Entries: ${count}`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mousemove", (event) => {
        d3.select(tooltipRef.current)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        d3.select(tooltipRef.current).style("opacity", 0);
      });

    svg
      .selectAll("text")
      .data(countries)
      .enter()
      .append("text")
      .attr("x", (_, i) => (i % columns) * boxSize + 6)
      .attr("y", (_, i) => Math.floor(i / columns) * boxSize + 20)
      .text((d) => d)
      .attr("font-size", "12px")
      .attr("fill", "#000");
  }, [data]);

  return (
    <>
      <div
        ref={ref}
        style={{
          width: "750px",
          height: "350px",
          overflowY: "scroll",
          overflowX: "hidden",
          position: "relative",
          border: "1px solid #ccc",
        }}
      />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          background: "#fff",
          border: "1px solid #ccc",
          padding: "6px 10px",
          borderRadius: "4px",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 1000,
          fontSize: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          whiteSpace: "nowrap",
        }}
      />
    </>
  );
}
