import React, { useState } from 'react';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import AccordionHeaderGrid from '../grids/AccordionHeaderGrid';

const SortableAccordion = () => {
    const [items, setItems] = useState([
        { key: 0, title: 'Item 1', content: 'Content 1' },
        { key: 1, title: 'Item 2', content: 'Content 2' },
        { key: 2, title: 'Item 3', content: 'Content 3' },
        { key: 3, title: 'Item 4', content: 'Content 4' },
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

    return (
        <Accordion defaultActiveKey="0">
            {items.map((item, index) => (
                <Accordion.Item eventKey={index.toString()} key={item.key}>
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
                        <Accordion.Collapse eventKey={index.toString()}>
                            <Card.Body>{item.content}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

export default SortableAccordion;
