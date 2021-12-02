import useD3 from "../hooks/useD3"
import React, { useState, useEffect} from "react"
import * as d3 from "d3"
import { useData } from "./useData"

function BarChart({ data }) {
    //als je een hook gebruikt moet deze altijd top-level worden aangemaakt 
    //hooks kunnen niet in if-statement/functies/loops of genest waar dan ook

    // const [shownData, setShownData] = useState()
    // de eerste value in de array is de current state en de 2e value is de functie voor de geupdate state
    const apiData = useData()
    const [shownData, setShownData] = useState()

  const ref = useD3(
    (svg) => {

       if(!shownData) {
         //als er geen data is return dan 
         return 
       }

        const margin = {top: 40, bottom: 140, left: 150, right: 20}
        const width = 800 - margin.left - margin.right
        const height = 600 - margin.top - margin.bottom

      const xScale = d3
        .scaleBand()
        .domain(shownData.map((d) => d.name))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1)

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(shownData, (d) => d.abv)])
        .rangeRound([height - margin.bottom, margin.top])

      
        const colorValue = d => d.abv
        const colorScale1 = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, d3.max(shownData, colorValue)])

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(xScale)      
            .tickValues(shownData.map((d) => d.name))
            .tickSizeOuter(0)    
        )
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .attr("text-anchor", "end")
        
        
      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(yScale).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("text-anchor", "start")
              .text(shownData.yScale)
          )

      svg.select(".x-axis").call(xAxis)
      svg.select(".y-axis").call(y1Axis)

//svg.select all rect .remove 
    
      svg
        .select(".plot-area")
        .selectAll(".bar")
        .data(shownData)
        .join("rect")
        .attr("fill", d => colorScale1(colorValue(d)))
        .transition()
        .duration(750)
        .ease(d3.easeLinear)
        .attr("title", (d) => d.name)
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.name))
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d.abv))
        .attr("height", (d) => yScale(0) - yScale(d.abv))
    },[shownData])
    
  function FilterTheBeers(event) {
    if (event.currentTarget.checked) {
      setShownData(apiData.filter((d) => 
      d.abv <= 6.5))
    } else {
      setShownData(apiData)
    }
  }

  useEffect(( ) => {
    setShownData(apiData)
  },[apiData])

  return (
      <>
      <h1>Filter biertjes met React en d3</h1>
      <label>
        <input
          type="checkbox"
          id="under6"
          onChange={FilterTheBeers}
        />
        under 6.5 % alcohol
      </label>
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
    </>
  )
}

export default BarChart
