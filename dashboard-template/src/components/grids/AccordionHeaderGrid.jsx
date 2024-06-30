import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function AccordionHeaderGrid({ headerText, onMoveUp, onMoveDown, disableUp, disableDown, onToggle }) {
    return (
        <Container fluid>
            <Row className="accordionHeaderRow">
                <Col
                    className="accordionHeaderCol1"
                    xs={10}
                >
                    {headerText}
                </Col>
                <Col className="accordionHeaderCol2" xs={1}>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onMoveUp();
                        }}
                        disabled={disableUp}
                    >
                        ↑
                    </Button>
                </Col>
                <Col className="accordionHeaderCol3" xs={1}>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onMoveDown();
                        }}
                        disabled={disableDown}
                    >
                        ↓
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default AccordionHeaderGrid;
