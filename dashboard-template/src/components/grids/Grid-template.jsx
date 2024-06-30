import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

function Grid() {
    return (
        <Container fluid>
            <Row className="headerRow">
                <Col className="headerRow1">Header here</Col>
            </Row>

            <Row className="contentRow1">
                <Col className="contentRow1Col1">1 of 5</Col>
                <Col className="contentRow1Col2">2 of 5</Col>
                <Col className="contentRow1Col3">3 of 5</Col>
                <Col className="contentRow1Col4">4 of 5</Col>
                <Col className="contentRow1Col5">5 of 5</Col>
            </Row>

            <Row className="gapRow1">
                <Col className="gapRow1Col1"> gap row 1</Col>
            </Row>


            <Row className="contentRow2">
                <Col className="contentRow2Col1">
                    1 of 1
                </Col>
            </Row>

            <Row className="gapRow2">
                <Col className="gapRow2Col1">gap row 2</Col>
            </Row>

            <Row className="contentRow3">
                <Col className="contentRow3Col1">1 of 1</Col>
            </Row>

            <Row className="gapRow3">
                <Col className="gapRow3Col1">gap row 3</Col>
            </Row>

            <Row className="contentRow4">
                <Col className="contentRow4Col1">1 of 1</Col>
            </Row>

            <Row className="gapRow4">
                <Col className="gapRow4Col1">gap row 4</Col>
            </Row>

            <Row className="contentRow5">
                <Col className="contentRow5Col1">1 of 1</Col>
            </Row>

            <Row className="gapRow5">
                <Col className="gapRow5Col1">gap row 5</Col>
            </Row>

            <Row className="contentRow6">
                <Col className="contentRow6Col1">1 of 1</Col>
            </Row>

            <Row className="gapRow6">
                <Col className="gapRow6Col1">gap row 6</Col>
            </Row>

        </Container>
    );
}

export default Grid;