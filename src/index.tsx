/**
 * @file entry file
 * @author helianthuswhite(yunzhi_huang@idgcapital.com)
 */

import React, { useRef } from "react";
import { RenderViewer, Slot, useIsomorphicLayoutEffect } from "@react-pdf-viewer/core";
import Scrollbars from "react-custom-scrollbars";
import { ScrollPluginProps } from "../types";

export const scrollPlugin = (scrollPluginProps: ScrollPluginProps) => {
    const scrollRef = useRef<Scrollbars & { view: HTMLDivElement }>();

    const renderViewer = (props: RenderViewer): Slot => {
        const { slot, zoom } = props;

        if (scrollRef.current && slot.subSlot) {
            slot.subSlot.attrs.ref.current = scrollRef.current.view;
        }

        useIsomorphicLayoutEffect(() => {
            const container = scrollRef.current?.view;

            if (scrollPluginProps && typeof scrollPluginProps.scale === "string" && container) {
                const io = new ResizeObserver((entries) => entries.forEach(() => zoom(scrollPluginProps.scale)));
                if (container) {
                    io.observe(container);

                    return (): void => {
                        io.unobserve(container);
                    };
                }
            }
        }, [scrollRef.current]);

        const updateSlot: Slot = {
            ...slot,
            children: (
                <Scrollbars
                    ref={scrollRef}
                    renderView={({ style }) => <div {...slot.subSlot?.attrs} style={style} />}
                    renderTrackVertical={({ style }) => (
                        <div style={{ ...style, right: 0, top: 2, bottom: 2, borderRadius: 3 }} />
                    )}
                    renderTrackHorizontal={({ style }) => (
                        <div style={{ ...style, bottom: 0, left: 2, right: 2, borderRadius: 3 }} />
                    )}
                    autoHide
                >
                    {slot.subSlot?.children}
                </Scrollbars>
            ),
            subSlot: null,
        };

        return updateSlot;
    };

    return {
        renderViewer,
    };
};
