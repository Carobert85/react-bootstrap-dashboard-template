import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from '../graphs/LineChart';
import SortableAccordion from "../accordion/SortableAccordion"; // Make sure the path to LineChart is correct

function Grid() {
    const [dimensions1, setDimensions1] = useState({ width: 0, height: 0 });
    const [dimensions2, setDimensions2] = useState({ width: 0, height: 0 });
    const chartContainerRef1 = useRef(null);
    const chartContainerRef2 = useRef(null);

    useEffect(() => {
        if (chartContainerRef1.current) {
            const { offsetWidth, offsetHeight } = chartContainerRef1.current;
            setDimensions1({ width: offsetWidth, height: offsetHeight });
        }
    }, [chartContainerRef1.current]);

    useEffect(() => {
        if (chartContainerRef2.current) {
            const { offsetWidth, offsetHeight } = chartContainerRef2.current;
            setDimensions2({ width: offsetWidth, height: offsetHeight });
        }
    }, [chartContainerRef2.current]);

    const fakeData = [
        { date: new Date(2023, 0, 1), value: 30 },
        { date: new Date(2023, 1, 1), value: 20 },
        { date: new Date(2023, 2, 1), value: 25 },
        { date: new Date(2023, 3, 1), value: 35 },
        { date: new Date(2023, 4, 1), value: 40 },
        { date: new Date(2023, 5, 1), value: 50 },
    ];

    return (
        <Container fluid>
            <Row className="headerRow">
                <Col className="headerRow1">Header here</Col>
            </Row>

            <Row className="contentRow1">
                <Col className="contentRow1Col1" ref={chartContainerRef1} style={{ position: 'relative' }}>
                    {dimensions1.width > 0 && dimensions1.height > 0 && (
                        <LineChart
                            data={fakeData}
                            colorScheme="red"
                            headerName="Monthly Data"
                            width={dimensions1.width}
                            height={dimensions1.height}
                            axisColor="black"
                        />
                    )}
                </Col>
                <Col className="contentRow1Col2">2 of 5</Col>
                <Col className="contentRow1Col3">3 of 5</Col>
                <Col className="contentRow1Col4">4 of 5</Col>
                <Col className="contentRow1Col5">5 of 5</Col>
            </Row>

            {/*<Row className="gapRow1">*/}
            {/*    <Col className="gapRow1Col1">gap row 1</Col>*/}
            {/*</Row>*/}

            <Row className="contentRow2">
                <Col className="contentRow2Col1" ref={chartContainerRef2} style={{position: 'relative'}}>
                    {/*{dimensions2.width > 0 && dimensions2.height > 0 && (*/}
                    {/*    <LineChart*/}
                    {/*        data={fakeData}*/}
                    {/*        colorScheme="blue"*/}
                    {/*        headerName="Monthly Data"*/}
                    {/*        width={dimensions2.width}*/}
                    {/*        height={dimensions2.height}*/}
                    {/*        axisColor="black"*/}
                    {/*    />*/}
                    {/*)}*/}
                    <div className="Accordion-graph">
                        <SortableAccordion/>
                    </div>

                </Col>
            </Row>

        </Container>
    );
}

export default Grid;
