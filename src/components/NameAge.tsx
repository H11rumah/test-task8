import React, { useEffect, useRef, useState } from "react";
import { Button, CellButton, Div, FormItem, FormLayoutGroup, FormStatus, Input, PanelHeader } from "@vkontakte/vkui";

type NameInfo = {
    count: number;
    name: string;
    age: number;
};

type NameAgeProps = {
    setActivePanel: React.Dispatch<React.SetStateAction<string>>;
};

const NameAge: React.FC<NameAgeProps> = ({ setActivePanel }) => {
    let [nameFieldValue, setNameFieldValue] = useState("");
    let [age, setAge] = useState<number>();
    let [isErrorVisible, setIsErrorVisible] = useState(false);

    let controller = useRef<AbortController>(new AbortController());
    let prevName = useRef<string>();
    let isFet = useRef<boolean>(false);
    let timer = useRef<NodeJS.Timeout>();

    async function sendName() {
        if (prevName.current === nameFieldValue) {
            setIsErrorVisible(true);
            return;
        }

        if (!nameFieldValue) return;

        prevName.current = nameFieldValue;

        isFet.current = true;
        clearTimeout(timer.current);

        let result: NameInfo = await fetch(`https://api.agify.io/?name=${nameFieldValue}`, { signal: controller.current.signal })
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            });

        if (result) setAge(result.age);

        isFet.current = false;
    }

    function cancelFetching() {
        controller.current.abort();
        controller.current = new AbortController();
    }

    function onClickHandler() {
        cancelFetching();
        sendName();
    }

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        if (/[A-Za-z]/g.test(event.target.value[event.target.value.length - 1])) {
            setNameFieldValue(event.target.value);

            setIsErrorVisible(false);
        }
    }

    useEffect(() => {
        clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            cancelFetching();
            sendName();
        }, 3000);
    }, [nameFieldValue]);

    return (
        <>
            <PanelHeader>Part 2</PanelHeader>
            <FormLayoutGroup>
                <Div hidden={!isErrorVisible}>
                    <FormStatus header="Same name" mode="error">
                        Enter another name
                    </FormStatus>
                </Div>
                <FormItem htmlFor="name" top="🧑 Name">
                    <Input id="name" type="text" value={nameFieldValue} onChange={onChangeHandler}></Input>
                </FormItem>
                {age ? <Div>Age - {age}</Div> : <></>}
                <FormItem>
                    <Button onClick={onClickHandler}>Click</Button>
                </FormItem>
            </FormLayoutGroup>
            <CellButton onClick={() => setActivePanel("panel1")}>Go to panel 1</CellButton>
        </>
    );
};

export default NameAge;
