import { cardType, colorsType, pathType } from "../types/components";
import SelectBox from "../components/SelectBox";
import CheckBox from "../components/CheckBox";
import Accordion from "../components/Accordion";
import Svg from "../components/Svg";
import Canvas from "../components/Canvas";
import Alert from "../components/Alert";
import imgRed from "../assets/accordion/red.png";
import imgOrange from "../assets/accordion/orange.png";
import imgYellow from "../assets/accordion/yellow.png";
import imgGreen from "../assets/accordion/green.png";
import imgBlue from "../assets/accordion/blue.png";
import imgNavy from "../assets/accordion/navy.png";
import imgPurple from "../assets/accordion/purple.png";

export const pathName: pathType[] = [
    { id: "A01", component: SelectBox },
    { id: "A02", component: CheckBox },
    { id: "B00", component: Accordion },
    { id: "C01", component: Svg },
    { id: "C02", component: Canvas },
    { id: "D00", component: Alert },
];

export const cards: cardType[] = [
    {
        name: "red",
        imgUrl: imgRed,
        rgb: "#FF0000",
    },
    {
        name: "orange",
        imgUrl: imgOrange,
        rgb: "#FFA500",
    },
    {
        name: "yellow",
        imgUrl: imgYellow,
        rgb: "#FFFF00",
    },
    {
        name: "green",
        imgUrl: imgGreen,
        rgb: "#008000",
    },
    {
        name: "blue",
        imgUrl: imgBlue,
        rgb: "#0000FF",
    },
    {
        name: "navy",
        imgUrl: imgNavy,
        rgb: "#000080",
    },
    {
        name: "purple",
        imgUrl: imgPurple,
        rgb: "#800080",
    },
];

export const colors: colorsType[] = [
    {
        name: "red",
        rgb: "#FF0000",
    },
    {
        name: "orange",
        rgb: "#FFA500",
    },
    {
        name: "yellow",
        rgb: "#FFFF00",
    },
    {
        name: "green",
        rgb: "#008000",
    },
    {
        name: "blue",
        rgb: "#0000FF",
    },
    {
        name: "navy",
        rgb: "#000080",
    },
    {
        name: "purple",
        rgb: "#800080",
    },
    {
        name: "black",
        rgb: "#000000",
    },
];
