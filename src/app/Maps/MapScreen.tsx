import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import { InteractiveImage } from "../../components/Containers/InteractiveImage";
import { useAppRoute } from "../../hooks/useAppNavigation";
import { useAppSelector } from "../../store";
import { imagesSelectors, mapsSelectors } from "../../store/eurofurence.selectors";
import { EnrichedImageRecord, EnrichedMapRecord } from "../../store/eurofurence.types";
import { LinkItem } from "./LinkItem";

export const MapScreen = () => {
    const sheetRef = useRef<BottomSheet>();
    const route2 = useAppRoute("Map");

    const map = useAppSelector((state): EnrichedMapRecord | undefined => mapsSelectors.selectById(state, route2.params.id));
    const image = useAppSelector((state): EnrichedImageRecord | undefined => (map?.ImageId ? imagesSelectors.selectById(state, map?.ImageId) : undefined));
    const entries = useMemo(
        () =>
            map?.Entries
                ? map.Entries.map((it) => ({
                      title: it.Id,
                      data: it.Links.map((link) => ({
                          ...link,
                          id: it.Id + link.Target,
                      })),
                  }))
                : ([] as const),
        [map]
    );

    useEffect(() => {
        if (isEmpty(entries)) {
            sheetRef.current?.close();
        } else {
            sheetRef.current?.snapToPosition(0);
        }
    }, [entries]);

    if (map === undefined || image === undefined) {
        return <Text>Nothing here but the bees . . .</Text>;
    }

    return (
        <View style={StyleSheet.absoluteFill}>
            <StatusBar />
            <InteractiveImage image={image} maxScale={10} />
            <BottomSheet snapPoints={["10%", "75%"]} index={0} ref={sheetRef}>
                <BottomSheetSectionList
                    sections={entries}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <LinkItem link={item} />}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                />
            </BottomSheet>
        </View>
    );
};
