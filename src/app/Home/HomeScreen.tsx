import { FC } from "react";
import { Text, View } from "react-native";

import { Label } from "../../components/Atoms/Label";
import { Section } from "../../components/Atoms/Section";
import { Button } from "../../components/Containers/Button";
import { Scroller } from "../../components/Containers/Scroller";
import { LoadingIndicator } from "../../components/Utilities/LoadingIndicator";
import { useTheme } from "../../context/Theme";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/authorization.slice";
import { useGetAnnouncementsQuery, useGetDealersQuery, useGetEventByIdQuery, useGetEventsQuery } from "../../store/eurofurence.service";
import { AnnouncementRecord, EnrichedDealerRecord, EventRecord } from "../../store/eurofurence.types";

export const HomeScreen: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
    // const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const announcements: Query<AnnouncementRecord[]> = useGetAnnouncementsQuery();

    const theme = useTheme();

    const events: Query<EventRecord[]> = useGetEventsQuery();
    const event: Query<EventRecord, string> = useGetEventByIdQuery("76430fe0-ece7-48c9-b8e6-fdbc3974ff64");
    const dealers: Query<EnrichedDealerRecord[]> = useGetDealersQuery();

    return (
        <Scroller>
            <Section icon="alarm" title="Countdown">
                {/* <ProgressBar progress={countdown.percentage} color={colors.primary} style={{ marginTop: 20, marginBottom: 5 }} /> */}
            </Section>

            {announcements.isFetching ? <LoadingIndicator /> : <Label mb={15}>There are {announcements.data?.length} announcements</Label>}
            {events.isFetching ? <LoadingIndicator /> : <Label mb={15}>There are {events.data?.length} events</Label>}
            {event.isFetching ? <LoadingIndicator /> : <Label mb={15}>We have retrieved event {event.data?.Title ?? "..."}</Label>}
            {dealers.isFetching ? <LoadingIndicator /> : <Label mb={15}>We have {dealers.data?.length ?? "..."} dealers</Label>}
            <Button onPress={() => dispatch(logout())}>Log-out</Button>

            {/* Theme verifier. */}
            <View style={{ marginTop: 30, flexDirection: "row", flexWrap: "wrap" }}>
                {Object.entries(theme).map(([name, color]) => (
                    <Text key={name} style={{ width: 150, height: 50, backgroundColor: color, padding: 15 }}>
                        {name}
                    </Text>
                ))}
            </View>

            {/* Label style verifier. */}
            <View style={{ backgroundColor: theme.background, alignSelf: "stretch", padding: 30 }}>
                <Label type="h1">Heading 1</Label>
                <Label type="h2">Heading 2</Label>
                <Label type="h3">Heading 3</Label>
                <Label type="h4">Heading 4</Label>
                <Label type="regular">Regular</Label>
                <Label type="regular" color="important">
                    Important regular
                </Label>
            </View>
        </Scroller>
    );
};
