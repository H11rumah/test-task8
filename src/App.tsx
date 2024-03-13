import React, { useState } from "react";
import { AppRoot, Panel, View } from "@vkontakte/vkui";
import Catfact from "./components/Catfact";
import NameAge from "./components/NameAge";

const App: React.FC = () => {
    let [activePanel, setActivePanel] = useState("panel1");

    return (
        <AppRoot>
            <View activePanel={activePanel}>
                <Panel id="panel1">
                    <Catfact setActivePanel={setActivePanel} />
                </Panel>
                <Panel id="panel2">
                    <NameAge setActivePanel={setActivePanel} />
                </Panel>
            </View>
        </AppRoot>
    );
};

export default App;
