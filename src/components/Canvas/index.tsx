import React, { useEffect, useState } from "react";
import "./style.scss";
import brush from "../../assets/canvas/brush.png";
import undoImg from "../../assets/canvas/undo.png";
import redoImg from "../../assets/canvas/redo.png";
import save from "../../assets/canvas/save.png";
import eraser from "../../assets/canvas/eraser.png";
import { colors } from "../../data/dummy";

const Canvas = () => {
    const CANVAS_WIDTH = 1024;
    const CANVAS_HEIGHT = 768;
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const [tool, setTool] = useState("");
    const [lineWidthValue, setLineWidthValue] = useState(20);
    const undoList: any = []; //string x
    const redoList: any = [];
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
        undoList.push(canvas.toDataURL());
    };

    //선 그리기
    const drawLine = (e: PointerEvent) => {
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
    const drawCircle = (e: PointerEvent) => {
        const { offsetX, offsetY } = e;
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, 80, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        undoList.push(canvas.toDataURL());
    };

    //사각형그리기
    const drawRect = (e: PointerEvent) => {
        const { offsetX, offsetY } = e;
        if (!ctx) return;
        ctx.strokeRect(offsetX, offsetY, 150, 150);
        undoList.push(canvas.toDataURL());
    };

    const selectTools = (e: any) => {
        const { id } = e.target;

        switch (id) {
            case "circle":
                canvas.addEventListener("pointerup", drawCircle);
                canvas.removeEventListener("pointerup", drawRect);
                canvas.removeEventListener("pointermove", drawLine);
                break;
            case "rect":
                canvas.addEventListener("pointerup", drawRect);
                canvas.removeEventListener("pointermove", drawLine);
                canvas.removeEventListener("pointerup", drawCircle);
                break;
            case "line":
                canvas.addEventListener("pointermove", drawLine);
                canvas.removeEventListener("pointerup", drawCircle);
                canvas.removeEventListener("pointerup", drawRect);
                break;
        }
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

    //뒤로가기
    const undo = () => {
        const undoImage = new Image();

        if (undoList.length === 0) return;
        const undoUrl = undoList.pop();
        undoImage.src = undoUrl;
        redoList.push(undoUrl);
        undoImage.onload = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.drawImage(undoImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        };
    };
    //앞으로가기
    const redo = () => {
        const redoImage = new Image();
        if (redoList.length === 0) return;
        const redoUrl = redoList.pop();
        redoImage.src = redoUrl;
        undoList.push(redoUrl);
        redoImage.onload = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.drawImage(redoImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        };
    };

    init();

    return (
        <div className="canvas-container">
            <canvas
                id="canvas"
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
            ></canvas>
            <div className="canvas-tools">
                <button
                    onClick={selectTools}
                    id="circle"
                    className="circle"
                ></button>
                <button
                    onClick={selectTools}
                    id="rect"
                    className="rect"
                ></button>
                <button className="brush">
                    <img
                        src={brush}
                        width="38"
                        onClick={selectTools}
                        id="line"
                    />
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
                <button onClick={undo}>
                    <img src={undoImg} width="45" />
                </button>
                <button onClick={redo}>
                    <img src={redoImg} width="45" />
                </button>
                <button onClick={handleSave}>
                    <img src={save} width="54" />
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
                    <img src={eraser} width="31" />
                </button>
                <button onClick={removeBoard}>전체 지우기</button>
            </div>
        </div>
    );
};
export default Canvas;
