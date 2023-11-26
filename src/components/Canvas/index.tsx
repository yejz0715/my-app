import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import brush from "../../assets/canvas/brush.png";
import undoImg from "../../assets/canvas/undo.png";
import redoImg from "../../assets/canvas/redo.png";
import save from "../../assets/canvas/save.png";
import eraser from "../../assets/canvas/eraser.png";
import { colors } from "../../data/dummy";
import classNames from "classnames";

const Canvas = () => {
    const CANVAS_WIDTH = 1024;
    const CANVAS_HEIGHT = 768;
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const ref = useRef<HTMLCanvasElement | null>(null);

    const [tool, setTool] = useState<string>("");
    const [lineWidthValue, setLineWidthValue] = useState<number>(20);
    const undoList: string[] = [];
    const redoList: string[] = [];
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

    //선 그리기
    const drawLine = (e: PointerEvent) => {
        if (!ctx) return;

        const { offsetX, offsetY } = e;

        if (!isDrag) {
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
        } else {
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        }

        // undoList.push(ref.current!.toDataURL());
    };

    //원그리기
    const drawCircle = (offsetX: number, offsetY: number) => {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, 80, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    };

    //사각형그리기
    const drawRect = (offsetX: number, offsetY: number) => {
        if (!ctx) return;
        ctx.strokeRect(offsetX, offsetY, 150, 150);
    };

    const onPointerDown = () => {
        isDrag = true;
    };
    const onPointerUp = (e: PointerEvent) => {
        const { offsetX, offsetY } = e;
        isDrag = false;
        switch (tool) {
            case "circle":
                drawCircle(offsetX, offsetY);
                break;
            case "rect":
                drawRect(offsetX, offsetY);
                break;
            default:
                break;
        }
        undoList.push(ref.current!.toDataURL());
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

        if (!undoList.length) return;
        const undoUrl = undoList.pop();
        undoImage.src = undoUrl!;
        redoList.push(undoUrl!);
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
        redoImage.src = redoUrl!;
        undoList.push(redoUrl!);
        redoImage.onload = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.drawImage(redoImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        };
    };

    init();

    useEffect(() => {
        if (!ref || !ref.current) return;
        ref.current.addEventListener("pointerup", onPointerUp);

        if (tool === "line") {
            ref.current.addEventListener("pointermove", drawLine);
        }

        return () => {
            if (!ref || !ref.current) return;
            ref.current.removeEventListener("pointerup", onPointerUp);
            ref.current.removeEventListener("pointermove", drawLine);
        };
    }, [tool]);

    return (
        <div className="canvas-container">
            <canvas
                ref={ref}
                id="canvas"
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                onPointerDown={onPointerDown}
            ></canvas>
            <div className="canvas-tools">
                <button
                    onClick={() => setTool("circle")}
                    id="circle"
                    className="circle"
                ></button>
                <button
                    onClick={() => setTool("rect")}
                    id="rect"
                    className="rect"
                ></button>
                <button className="brush">
                    <img
                        src={brush}
                        width="38"
                        onClick={() => setTool("line")}
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
                {colors &&
                    colors.map((item, index) => (
                        <button
                            className={classNames("color")}
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
