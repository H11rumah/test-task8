import React, { useEffect, useRef, useState } from "react";
import { Button, CellButton, FormItem, FormLayoutGroup, Input, PanelHeader } from "@vkontakte/vkui";

type Fact = {
    fact: string;
    length: number;
};

type CatfactProps = {
    setActivePanel: React.Dispatch<React.SetStateAction<string>>;
};

const Catfact: React.FC<CatfactProps> = ({ setActivePanel }) => {
    let [factFieldValue, setFactFieldValue] = useState("");
    let [isFetching, setIsFetching] = useState(false);

    let factFieldRef = useRef<HTMLInputElement>(null);

    async function getFact() {
        setIsFetching(true);

        let response = await fetch("https://catfact.ninja/fact");
        let result: Fact = await response.json();

        setFactFieldValue(result.fact);
        setIsFetching(false);

        if (factFieldRef.current) {
            factFieldRef.current.focus();
        }
    }

    useEffect(() => {
        if (factFieldRef.current) {
            let length = factFieldValue.replaceAll(/[\.\,\!\?\;\:\^\$\@\*\+\=\-\_\&]/g, "").split(" ")[0].length;

            factFieldRef.current.selectionStart = length;
            factFieldRef.current.selectionEnd = length;
        }
    }, [factFieldValue]);

    return (
        <>
            <PanelHeader>Part 1</PanelHeader>
            <FormLayoutGroup>
                <FormItem htmlFor="fact" top="📝 Fact">
                    <Input
                        id="fact"
                        type="text"
                        getRef={factFieldRef}
                        value={factFieldValue}
                        onChange={(event) => setFactFieldValue(event.target.value)}
                    ></Input>
                </FormItem>
                <FormItem>
                    <Button loading={isFetching} onClick={getFact}>
                        Click
                    </Button>
                </FormItem>
            </FormLayoutGroup>
            <CellButton onClick={() => setActivePanel("panel2")}>Go to panel 2</CellButton>
        </>
    );
};

export default Catfact;
