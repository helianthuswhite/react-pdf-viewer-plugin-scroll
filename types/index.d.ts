/**
 * @file interface file
 * @author helianthuswhite(hyz19960229@gmail.com)
 */

import { Plugin, SpecialZoomLevel } from "@react-pdf-viewer/core";

export interface ScrollPluginProps {
    // current scale of the document
    scale?: number | SpecialZoomLevel;
}

export function scrollPlugin(props: ScrollPluginProps): Plugin;
