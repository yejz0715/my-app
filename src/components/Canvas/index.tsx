import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import brush from "../../assets/canvas/brush.png";
import undoImg from "../../assets/canvas/undo.png";
import redoImg from "../../assets/canvas/redo.png";
import save from "../../assets/canvas/save.png";
import eraser from "../../assets/canvas/eraser.png";
import { colors } from "../../data/dummy";
import classNames from "classnames";

/**
 * Canvas component 입니다.
 * @returns {JSX.Element}
 */
const Canvas = (): JSX.Element => {
    const CANVAS_WIDTH = 1024;
    const CANVAS_HEIGHT = 768;
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const ref = useRef<HTMLCanvasElement | null>(null);
    const [tool, setTool] = useState<string>("");
    const [lineWidthValue, setLineWidthValue] = useState<number>(20);
    const [currentColor, setCurrentColor] = useState<string>("black");
    const undoList: string[] = [];
    const redoList: string[] = [];
    let ctx: CanvasRenderingContext2D | null;
    let isDrag = false;

    // 초기화 설정하는 함수
    const init = (): void => {
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.lineWidth = lineWidthValue;
        ctx.lineCap = "round";
        ctx.strokeStyle = currentColor;
    };

    //그림판_도구: 선을 그리는 함수
    const drawLine = (e: PointerEvent): void => {
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

    //그림판_도구: 원을 그리는 함수
    const drawCircle = (offsetX: number, offsetY: number): void => {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, 80, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    };

    //그림판_도구: 사각형을 그리는 함수
    const drawRect = (offsetX: number, offsetY: number): void => {
        if (!ctx) return;
        ctx.strokeRect(offsetX, offsetY, 150, 150);
    };

    const onPointerDown = (): void => {
        isDrag = true;
    };

    //  그림판 도구 원과 사각형중에서 선택하는 함수
    const onPointerUp = (e: PointerEvent): void => {
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

    //붓 굵기를 선택하는 함수
    const handleLineWidthChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { value } = e.target;
        setLineWidthValue(Number(value));
        console.log(tool);
    };

    //색을 변경하는 함수
    const handleSetStrokeColor = (color: string): void => {
        if (!ctx) return;
        if (color === "white") {
            setTool("line");
        }
        setCurrentColor(color);
    };

    //그림판 전체를 지우는 함수
    const removeBoard = (): void => {
        if (!ctx) return;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    //그림판을 저장하는 함수
    const handleSave = (): void => {
        const a = document.createElement("a");
        const fileName = "image.png";
        a.href = canvas.toDataURL();
        a.setAttribute("download", fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    //이전 상태로 되돌리는 함수
    const undo = (): void => {
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
    //현재 상태로 돌아가는 함수
    const redo = (): void => {
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
