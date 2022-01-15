import React, { useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { NotificationManager } from "react-notifications";

const unityContext = new UnityContext({
    loaderUrl: "build/Build/build.loader.js",
    dataUrl: "build/Build/build.data",
    frameworkUrl: "build/Build/build.framework.js",
    codeUrl: "build/Build/build.wasm",
    streamingAssetsUrl: "build/StreamingAssets",
});

function Home() {
    useEffect(() => {
        unityContext.on("GameController", (message) => {
            if (message === "Ready") {
                try {
                    window.onmessage = (e) => {
                        unityContext.send(
                            "MenuManager",
                            "RequestToken",
                            JSON.stringify({
                                token: e.data.token,
                                amount: e.data.allowanceAmount,
                            })
                        );
                    };

                    window.parent.postMessage({ name: "iframe_message" }, "*");
                } catch (err) {
                    console.log("error", err);
                }
            } else if (message === "Control") {
                NotificationManager.error(
                    "Please check your balance",
                    "",
                    3000
                );
            } else console.log("Unity Ready Error");
        });
    }, []);

    return (
        <div>
            <Unity
                unityContext={unityContext}
                matchWebGLToCanvasSize={true}
                style={{ height: "99vh", width: "100%" }}
            />
        </div>
    );
}

export default Home;
