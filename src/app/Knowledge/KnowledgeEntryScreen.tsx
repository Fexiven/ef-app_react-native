import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { appStyles } from "../../components/app/AppStyles";
import { LinkItem } from "../../components/app/maps/LinkItem";
import { MarkdownContent } from "../../components/generic/atoms/MarkdownContent";
import { Floater } from "../../components/generic/containers/Floater";
import { Header } from "../../components/generic/containers/Header";
import { useAppRoute } from "../../hooks/nav/useAppNavigation";
import { useAppSelector } from "../../store";
import { knowledgeEntriesSelectors, selectImagesById } from "../../store/eurofurence.selectors";

export const KnowledgeEntryScreen = () => {
    const { params } = useAppRoute("KnowledgeEntry");
    const entry = useAppSelector((state) => knowledgeEntriesSelectors.selectById(state, params.id));
    const images = useAppSelector((state) => selectImagesById(state, entry?.ImageIds ?? []));
    const safe = useSafeAreaInsets();
    return (
        <ScrollView style={[appStyles.abs, safe]} stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
            <Header>{entry?.Title}</Header>
            <Floater contentStyle={appStyles.trailer}>
                {images.map((it) => (
                    <Image style={styles.image} source={{ uri: it.FullUrl }} key={it.Id} contentFit="contain" />
                ))}
                <MarkdownContent>{entry?.Text ?? ""}</MarkdownContent>
                {entry?.Links.map((link) => (
                    <View style={{ marginBottom: 10 }}>
                        <LinkItem link={link} key={link.Target} />
                    </View>
                ))}
            </Floater>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "auto",
        aspectRatio: 4 / 3,
    },
});
