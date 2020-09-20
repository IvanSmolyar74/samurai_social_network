import React from "react";
import Status from "./Status";
import {create} from 'react-test-renderer'

describe("Status component", () => {
    test("status on props should be in the state", () => {
        const component = create(<Status status={'it-kamasutra'}/>)
        const props = component.props;
        expect(props).toBe({status: 'it-kamasutra'})
    })

    test("after creation <span> should be displayed", () => {
        const component = create(<Status status={'it-kamasutra'}/>)
        const root = component.root;
        let span = root.findByType("span")
        expect(span).not.toBeNull()
    })

    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<Status status={'it-kamasutra'}/>)
        const root = component.root;

        expect(() => {
            let input = root.findByType("input")
        }).toThrow()
    })

    test("after creation <span> should contains correct status", () => {
        const component = create(<Status status={'it-kamasutra'}/>)
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe('it-kamasutra')
    })

    test("input should be displayed in edit mode instead span", () => {
        const component = create( <Status status={'it-kamasutra'}/>)
        const root = component.root;
        let span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input")
        expect(input.props.placeholder).toBe('it-kamasutra')
    })
})
