import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, colorScheme, headerName, width, height, axisColor }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data.length === 0) return;

        const margin = { top: 40, right: 30, bottom: 30, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const svg = d3.select(chartRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, chartWidth]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .nice()
            .range([chartHeight, 0]);

        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));

        svg.append('g')
            .attr('transform', `translate(0,${chartHeight})`)
            .call(d3.axisBottom(x).ticks(chartWidth / 80).tickSizeOuter(0))
            .selectAll('text')
            .attr('fill', axisColor);

        svg.append('g')
            .call(d3.axisLeft(y))
            .selectAll('text')
            .attr('fill', axisColor);

        svg.selectAll('path')
            .attr('stroke', axisColor);

        svg.selectAll('line')
            .attr('stroke', axisColor);

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', colorScheme)
            .attr('stroke-width', 1.5)
            .attr('d', line);

        svg.append('text')
            .attr('x', chartWidth / 2)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .text(headerName);

        return () => {
            d3.select(chartRef.current).selectAll('*').remove();
        };
    }, [data, colorScheme, headerName, width, height, axisColor]);

    return <svg ref={chartRef}></svg>;
};

export default LineChart;
