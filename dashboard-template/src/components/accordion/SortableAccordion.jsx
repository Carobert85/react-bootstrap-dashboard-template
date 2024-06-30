import React, { useState } from 'react';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import AccordionHeaderGrid from '../grids/AccordionHeaderGrid';
import AccordionBodyGrid from '../grids/AccordionBodyGrid'; // Ensure the path is correct

const SortableAccordion = () => {
    const [items, setItems] = useState([
        {
            key: 0,
            title: 'Item 1',
            chartProps: {
                data: [
                    { date: new Date(2023, 0, 1), value: 30 },
                    { date: new Date(2023, 1, 1), value: 20 },
                    { date: new Date(2023, 2, 1), value: 25 },
                    { date: new Date(2023, 3, 1), value: 35 },
                    { date: new Date(2023, 4, 1), value: 40 },
                    { date: new Date(2023, 5, 1), value: 50 },
                ],
                colorScheme: 'steelblue',
                headerName: 'Monthly Data',
                axisColor: 'black'
            }
        },
        {
            key: 1,
            title: 'Item 2',
            chartProps: {
                data: [
                    { date: new Date(2023, 0, 1), value: 15 },
                    { date: new Date(2023, 1, 1), value: 30 },
                    { date: new Date(2023, 2, 1), value: 20 },
                    { date: new Date(2023, 3, 1), value: 25 },
                    { date: new Date(2023, 4, 1), value: 45 },
                    { date: new Date(2023, 5, 1), value: 50 },
                ],
                colorScheme: 'red',
                headerName: 'Sales Data',
                axisColor: 'green'
            }
        },
        {
            key: 2,
            title: 'Item 3',
            chartProps: {
                data: [
                    { date: new Date(2023, 0, 1), value: 5 },
                    { date: new Date(2023, 1, 1), value: 10 },
                    { date: new Date(2023, 2, 1), value: 15 },
                    { date: new Date(2023, 3, 1), value: 20 },
                    { date: new Date(2023, 4, 1), value: 25 },
                    { date: new Date(2023, 5, 1), value: 30 },
                ],
                colorScheme: 'blue',
                headerName: 'Growth Data',
                axisColor: 'purple'
            }
        },
        {
            key: 3,
            title: 'Item 4',
            chartProps: {
                data: [
                    { date: new Date(2023, 0, 1), value: 50 },
                    { date: new Date(2023, 1, 1), value: 45 },
                    { date: new Date(2023, 2, 1), value: 40 },
                    { date: new Date(2023, 3, 1), value: 35 },
                    { date: new Date(2023, 4, 1), value: 30 },
                    { date: new Date(2023, 5, 1), value: 25 },
                ],
                colorScheme: 'orange',
                headerName: 'Decline Data',
                axisColor: 'blue'
            }
        },
    ]);

    const moveItem = (oldIndex, newIndex) => {
        if (newIndex < 0 || newIndex >= items.length) return;
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(oldIndex, 1);
        updatedItems.splice(newIndex, 0, movedItem);
        setItems(updatedItems);
    };

    const ToggleButton = ({ children, eventKey, callback }) => {
        const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));

        return (
            <div onClick={decoratedOnClick} style={{ cursor: 'pointer' }}>
                {children}
            </div>
        );
    };

    const handleDimensionsChange = (index, dimensions) => {
        setItems(prevItems => {
            const updatedItems = [...prevItems];
            if (
                updatedItems[index].dimensions?.width !== dimensions.width ||
                updatedItems[index].dimensions?.height !== dimensions.height
            ) {
                updatedItems[index].dimensions = dimensions;
                return updatedItems;
            }
            return prevItems;
        });
    };

    const allKeys = items.map(item => item.key.toString());

    return (
        <Accordion defaultActiveKey={allKeys} alwaysOpen>
            {items.map((item, index) => (
                <Accordion.Item eventKey={index.toString()} key={item.key} className="accordion-item">
                    <Card>
                        <Card.Header>
                            <ToggleButton eventKey={index.toString()}>
                                <AccordionHeaderGrid
                                    headerText={item.title}
                                    onMoveUp={() => moveItem(index, index - 1)}
                                    onMoveDown={() => moveItem(index, index + 1)}
                                    disableUp={index === 0}
                                    disableDown={index === items.length - 1}
                                />
                            </ToggleButton>
                        </Card.Header>
                        <Accordion.Collapse
                            eventKey={index.toString()}
                            onEntered={() => handleDimensionsChange(index, { width: 0, height: 0 })}
                        >
                            <Card.Body>
                                <AccordionBodyGrid
                                    data={item.chartProps.data}
                                    colorScheme={item.chartProps.colorScheme}
                                    headerName={item.chartProps.headerName}
                                    axisColor={item.chartProps.axisColor}
                                    onDimensionsChange={(dims) => handleDimensionsChange(index, dims)}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

export default SortableAccordion;
