import ReactDOM from "react-dom/client";
import App from "./App";
import "@vkontakte/vkui/dist/vkui.css";
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

bridge.send("VKWebAppInit");

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <ConfigProvider appearance="light">
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>
);
