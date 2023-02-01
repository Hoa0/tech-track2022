import "../styles/style.css";
import {displayMap} from "./map";
import {urlData, map, markersCity} from "./variables";
import { renderContent } from "./renderContent";
import { renderLocation, createGraph } from "./plotCircle";
import{eventsBtn} from "./selectBtn";
import * as d3 from "d3";
import { getData } from "./data";


displayMap(map)

renderLocation(urlData)
createGraph(markersCity)

eventsBtn(urlData, "eventSelect")

/**
 * show events content
 */
renderContent(urlData, "cards-container") 

