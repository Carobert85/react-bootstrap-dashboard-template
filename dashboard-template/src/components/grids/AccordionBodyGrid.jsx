import React, { useRef, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from '../graphs/LineChart'; // Ensure the path is correct

const AccordionBodyGrid = ({ data, colorScheme, headerName, axisColor, onDimensionsChange }) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const calculateDimensions = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                if (offsetWidth !== dimensions.width || offsetHeight !== dimensions.height) {
                    setDimensions({ width: offsetWidth, height: offsetHeight });
                    onDimensionsChange({ width: offsetWidth, height: offsetHeight });
                    console.log(`Calculated dimensions grid: width=${offsetWidth}, height=${offsetHeight}`);
                }
            }
        };

        calculateDimensions(); // Calculate dimensions immediately after mount

        window.addEventListener('resize', calculateDimensions);

        return () => {
            window.removeEventListener('resize', calculateDimensions);
        };
    }, [dimensions, onDimensionsChange]);

    return (
        <Container fluid ref={containerRef} style={{ minHeight: '200px' }}>
            <Row className="AccordionBodyRow">
                <Col className="AccordionBodyCol1">
                    {dimensions.width > 0 && dimensions.height > 0 && (
                        <LineChart
                            data={data}
                            colorScheme={colorScheme}
                            headerName={headerName}
                            width={dimensions.width}
                            height={dimensions.height}
                            axisColor={axisColor}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AccordionBodyGrid;
