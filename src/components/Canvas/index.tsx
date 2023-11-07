import React, { useEffect, useState } from "react";
import "./style.scss";
import eraser from "../../assets/eraser.png";
import brush from "../../assets/brush.png";
import save from "../../assets/save.png";
import { colors } from "../../data/dummy";

const Canvas = () => {
    const CANVAS_WIDTH = 1024;
    const CANVAS_HEIGHT = 768;
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const [lineWidthValue, setLineWidthValue] = useState(20);
    let ctx: CanvasRenderingContext2D | null;
    let isDrag = false;

    const init = () => {
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.lineWidth = lineWidthValue;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
    };

    const onPointerDown = () => {
        isDrag = true;
    };
    const onPointerUp = () => {
        isDrag = false;
    };

    //선 그리기
    const drawPath = (e: PointerEvent) => {
        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointerup", onPointerUp);
        const { offsetX, offsetY } = e;

        if (!ctx) return;

        if (!isDrag) {
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
        } else {
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        }
    };

    //원그리기
    const completeCircle = (e: PointerEvent) => {
        const { offsetX, offsetY } = e;
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, 80, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    };

    //사각형그리기
    const completeRect = (e: PointerEvent) => {
        const { offsetX, offsetY } = e;
        if (!ctx) return;
        ctx.strokeRect(offsetX, offsetY, 150, 150);
    };

    const drawLine = () => {
        canvas.removeEventListener("pointerup", completeCircle);
        canvas.removeEventListener("pointerup", completeRect);
        canvas.addEventListener("pointermove", drawPath);
    };

    const drawCircle = () => {
        canvas.removeEventListener("pointermove", drawPath);
        canvas.removeEventListener("pointerup", completeRect);
        canvas.addEventListener("pointerup", completeCircle);
    };

    const drawRect = () => {
        canvas.removeEventListener("pointermove", drawPath);
        canvas.removeEventListener("pointerup", completeCircle);
        canvas.addEventListener("pointerup", completeRect);
    };

    //붓굵기
    const handleLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLineWidthValue(Number(value));
    };

    //색변경
    const handleSetStrokeColor = (color: string) => {
        if (!ctx) return;
        ctx.strokeStyle = color;
    };

    //전체지우기
    const removeBoard = () => {
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    //저장
    const handleSave = () => {
        const a = document.createElement("a");
        const fileName = "image.png";
        a.href = canvas.toDataURL();
        a.setAttribute("download", fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    init();

    return (
        <div className="canvas-container">
            <canvas
                id="canvas"
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
            ></canvas>
            <div className="canvas-tools">
                <button onClick={drawCircle} className="circle"></button>
                <button onClick={drawRect} className="rect"></button>
                <button onClick={drawLine} className="brush">
                    <img src={brush} width="38px" />
                </button>
                <input
                    type="range"
                    id="line-range"
                    min="10"
                    max="50"
                    step="10"
                    value={lineWidthValue}
                    onChange={handleLineWidthChange}
                />
                <button className="save" onClick={handleSave}>
                    <img src={save} width="54px" />
                </button>
            </div>
            <div className="canvas-colors">
                {colors.map((item, index) => (
                    <button
                        className="color"
                        key={index}
                        onClick={() => handleSetStrokeColor(`${item.name}`)}
                        style={{ background: item.rgb }}
                    ></button>
                ))}

                <button onClick={() => handleSetStrokeColor("white")}>
                    <img src={eraser} width="31px" />
                </button>
                <button onClick={removeBoard}>전체 지우기</button>
            </div>
        </div>
    );
};
export default Canvas;
