import useD3 from "../hooks/useD3";
import { dataBeer } from "../data";
import React from "react";
import * as d3 from "d3";
import { scaleLinear } from "d3";

function BarChart({ data }) {
    //als je een hook gebruikt moet deze altijd top-level worden aangemaakt 
    //hooks kunnen niet in if-statement/functies/loops of genest waar dan ook

    // const [var1, setVar1] = useState()
    // de eerste value in de array is de current state en de 2e value is de functie voor de geupdate state
  const ref = useD3(
    (svg) => {
       
        const margin = {top: 40, bottom: 140, left: 150, right: 20};
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.abv)])
        .rangeRound([height - margin.bottom, margin.top]);

      
        const colorValue = d => d.abv
        
        //const colorScale1 = d3.scaleSequential(d3.interpolateRainbow).domain([0,10])
        //const colorScale1 = d3.scaleSequential(d3.interpolateYlOrRd).domain([0,10])
        const colorScale1 = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, d3.max(data, colorValue)])

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(xScale)      
            .tickValues(data.map((d) => d.name))
            .tickSizeOuter(0)    
        )
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .attr("text-anchor", "end")
        
        
      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "#440099")
          .call(d3.axisLeft(yScale).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              //.attr("fill", colorScale)
              .attr("text-anchor", "start")
              .text(data.yScale)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .transition()
        //.attr("fill", function(d,i){return colorScale1(i)})
        .attr("fill", d => colorScale1(colorValue(d)))
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.name))
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d.abv))
        .attr("height", (d) => yScale(0) - yScale(d.abv));
    },
    [data.length]
  );

  return (
      <>
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px"
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
    {/* <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter data
      </button> */}
    </>
  );
}

export default BarChart;
