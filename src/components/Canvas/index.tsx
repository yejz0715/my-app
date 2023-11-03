import React, { useEffect, useState } from "react";
import "./style.scss";
import data from "../../../db.json";
const Canvas = () => {
    let ctx: CanvasRenderingContext2D | null;
    let isDrag = false;
    const colors = data.colors;
    const [range, setRange] = useState(20);
    const init = () => {
        const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

        if (!canvas) return;

        ctx = canvas.getContext("2d");
        console.log("ctx", ctx);
        if (!ctx) return;

        ctx.lineWidth = range;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";

        canvas.addEventListener("pointerdown", () => {
            isDrag = true;
        });
        canvas.addEventListener("pointerup", () => {
            isDrag = false;
        });
        canvas.addEventListener("pointermove", (e) => {
            const { offsetX, offsetY } = e;

            if (!ctx) return;

            if (!isDrag) {
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY);
            } else {
                ctx.lineTo(offsetX, offsetY);
                ctx.stroke();
            }
        });
    };
    const removeBoard = () => {
        if (!ctx) {
            console.log(ctx);
            return;
        }
        ctx.clearRect(0, 0, 1024, 768);
    };

    const handleSetStrokeColor = (color: string) => {
        if (!ctx) return;
        ctx.strokeStyle = color;
    };

    const handleLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setRange(Number(value));
    };
    init();

    return (
        <div className="canvas-container">
            <canvas id="canvas" width="1024" height="768"></canvas>

            <input
                type="range"
                id="line-range"
                min="10"
                max="50"
                step="10"
                onChange={handleLineWidthChange}
            />
            <div className="canvas-tool">
                {colors.map((item, index) => (
                    <div
                        className="color"
                        key={index}
                        onClick={() => handleSetStrokeColor(`${item}`)}
                    >
                        {item}
                    </div>
                ))}

                <div onClick={() => handleSetStrokeColor("white")}>지우개</div>
                <button onClick={removeBoard}>전체 지우기</button>
            </div>
        </div>
    );
};
export default Canvas;
