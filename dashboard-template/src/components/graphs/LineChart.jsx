import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, colorScheme, headerName, width, height, axisColor, keyData, showLegend }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data.length === 0) return;

        const margin = { top: 40, right: showLegend ? 150 : 30, bottom: 30, left: 40 };
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

        if (showLegend) {
            // Create the legend
            const legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${chartWidth + 20}, 0)`);

            legend.selectAll('g')
                .data(keyData)
                .enter()
                .append('g')
                .attr('transform', (d, i) => `translate(0, ${i * 40})`)
                .each(function (d) {
                    const g = d3.select(this);
                    g.append('circle')
                        .attr('cx', 0)
                        .attr('cy', 0)
                        .attr('r', 8) // Increase radius to make circles larger
                        .attr('fill', d.positive ? 'green' : 'red');

                    g.append('text')
                        .attr('x', 15)
                        .attr('y', 5)
                        .attr('class', 'legend-text')
                        .text(d.name)
                        .style('font-size', '12px');

                    g.append('text')
                        .attr('x', 0)
                        .attr('y', 3) // Center the arrow vertically in the circle
                        .attr('text-anchor', 'middle')
                        .style('font-size', '12px')
                        .style('fill', 'white')
                        .text(d.positive ? '↑' : '↓');
                });
        }

        return () => {
            d3.select(chartRef.current).selectAll('*').remove();
        };
    }, [data, colorScheme, headerName, width, height, axisColor, keyData, showLegend]);

    return <svg ref={chartRef}></svg>;
};

export default LineChart;
