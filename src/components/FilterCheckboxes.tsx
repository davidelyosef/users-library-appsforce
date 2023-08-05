import {Form, InputGroup} from "react-bootstrap";
import React, {ChangeEvent} from "react";

interface FilterCheckboxesProps {
    filter: string;
    setFilter: (filter: string) => void;
}

function FilterCheckboxes({ filter, setFilter }: FilterCheckboxesProps) {

    const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === filter) {
            return;
        }
        setFilter(e.target.value);
    }

    return (
        <div className="d-md-flex gap-md-2 flex-md-row col-12 col-lg-8 align-items-md-center gap-xl-3">
            <div className={"flex-shrink-0"}>
                Filter by:
            </div>

            <InputGroup>
                <InputGroup.Checkbox aria-label="Checkbox for filtering by email" value="email"
                                     checked={filter === "email"} onChange={checkboxHandler}/>
                <Form.Control aria-label="Text input with checkbox" value="Email" disabled={true}/>
            </InputGroup>

            <InputGroup>
                <InputGroup.Checkbox aria-label="Checkbox for filtering by name" value="name" checked={filter === "name"}
                                     onChange={checkboxHandler}/>
                <Form.Control aria-label="Text input with checkbox" value="Name" disabled={true}/>
            </InputGroup>

            <InputGroup>
                <InputGroup.Checkbox aria-label="Checkbox for filtering by ID" value="id" checked={filter === "id"}
                                     onChange={checkboxHandler}/>
                <Form.Control aria-label="Text input with checkbox" value="ID" disabled={true}/>
            </InputGroup>

            <InputGroup>
                <InputGroup.Checkbox aria-label="Checkbox for filtering by location" value="location"
                                     checked={filter === "location"} onChange={checkboxHandler}/>
                <Form.Control aria-label="Text input with checkbox" value="Location" disabled={true}/>
            </InputGroup>
        </div>
    )
}

export default FilterCheckboxes;