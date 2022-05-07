import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
    onScreenshotTook: (screenshot: string | null ) => void;
    screenshot: string | null;
}

export function ScreenShotButton({onScreenshotTook, screenshot}: ScreenshotButtonProps ) {
    //sinal de loading
    const [isTakingScreenshot, setIsTakingScreenshot ] = useState(false)
    
    //tirando print e convertendo
    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true);

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        console.log(base64image);

        onScreenshotTook(base64image);

        setIsTakingScreenshot(false);

    }

    if(screenshot) {
        return(
            <button 
                onClick={() => onScreenshotTook(null)}
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180,
                }}
                type="button" 
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            >
                <Trash weight="fill" />
            </button>
        );
    }


    return(
        <button
        type="button"
        onClick={handleTakeScreenshot}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
        >
            { isTakingScreenshot ? <Loading /> :  <Camera className="w-6 h-6" />}
        </button>
    )
}