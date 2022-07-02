import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import moment from "moment";
import { REHYDRATE } from "redux-persist";

import { enrichDealer } from "./eurofurence.enrichers";
import {
    AnnouncementRecord,
    DealerRecord,
    EnrichedDealerRecord,
    EventDayRecord,
    EventRecord,
    EventRoomRecord,
    EventTrackRecord,
    KnowledgeEntryRecord,
    KnowledgeGroupRecord,
    MapRecord,
    RecordMetadata,
} from "./eurofurence.types";

const tagsFromList =
    <TagType extends string>(type: TagType) =>
    <ResultType extends RecordMetadata[]>(result: ResultType | undefined) =>
        result ? result.map((it) => ({ type, id: it.Id })) : [type];
const tagsFromItem =
    <TagType extends string>(type: TagType) =>
    <ResultType extends RecordMetadata>(result: ResultType | undefined) =>
        result ? [{ type, id: result.Id }] : [type];

export const eurofurenceService = createApi({
    reducerPath: "eurofurenceService",
    baseQuery: fetchBaseQuery({ baseUrl: "https://app.eurofurence.org/EF26" }),
    tagTypes: ["Announcement", "Event", "Dealer", "EventDay", "EventTrack", "EventRoom", "Map", "KnowledgeGroup", "KnowledgeEntry"],
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === REHYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getAnnouncements: builder.query<AnnouncementRecord[], void>({
            query: () => ({ url: "/Api/Announcements" }),
            providesTags: tagsFromList("Announcement"),
        }),
        getAnnouncementsById: builder.query<AnnouncementRecord, string>({
            query: (args) => ({ url: `/Api/Announcements/${args}` }),
            providesTags: tagsFromItem("Announcement"),
        }),
        getEvents: builder.query<EventRecord[], void>({
            query: () => ({ url: "/Api/Events" }),
            providesTags: tagsFromList("Event"),
        }),
        getEventById: builder.query<EventRecord, string>({
            query: (args) => ({ url: `/Api/Events/${args}` }),
            providesTags: tagsFromItem("Event"),
        }),
        getDealers: builder.query<EnrichedDealerRecord[], void>({
            query: () => ({ url: "/Api/Dealers" }),
            providesTags: tagsFromList("Dealer"),
            transformResponse: (result: DealerRecord[]): EnrichedDealerRecord[] => result.map(enrichDealer),
        }),
        getDealerById: builder.query<EnrichedDealerRecord, string>({
            query: (args) => ({ url: `/Api/Dealers/${args}` }),
            providesTags: tagsFromItem("Dealer"),
            transformResponse: enrichDealer,
        }),
        getEventDays: builder.query<EventDayRecord[], void>({
            query: () => ({ url: "/Api/EventConferenceDays" }),
            providesTags: tagsFromList("EventDay"),
        }),
        getEventDayById: builder.query<EventDayRecord, string>({
            query: (args) => ({ url: `/Api/EventConferenceDays/${args}` }),
            providesTags: tagsFromItem("EventDay"),
        }),
        getEventTracks: builder.query<EventTrackRecord[], void>({
            query: () => ({ url: "/Api/EventConferenceTracks" }),
            providesTags: tagsFromList("EventTrack"),
        }),
        getEventTrackById: builder.query<EventTrackRecord, string>({
            query: (args) => ({ url: `/Api/EventConferenceTracks/${args}` }),
            providesTags: tagsFromItem("EventTrack"),
        }),
        getEventRooms: builder.query<EventRoomRecord[], void>({
            query: () => ({ url: "/Api/EventConferenceRooms" }),
            providesTags: tagsFromList("EventRoom"),
        }),
        getEventRoomById: builder.query<EventRoomRecord, string>({
            query: (args) => ({ url: `/Api/EventConferenceRooms/${args}` }),
            providesTags: tagsFromItem("EventRoom"),
        }),
        getMaps: builder.query<MapRecord[], void>({
            query: () => ({ url: "/Api/MAps" }),
            providesTags: tagsFromList("Map"),
        }),
        getMapById: builder.query<MapRecord, string>({
            query: (args) => ({ url: `/Api/Maps/${args}` }),
            providesTags: tagsFromItem("Map"),
        }),
        getKnowledgeGroups: builder.query<KnowledgeGroupRecord[], void>({
            query: () => ({ url: "/Api/KnowledgeGroups" }),
            providesTags: tagsFromList("KnowledgeGroup"),
        }),
        getKnowledgeGroupById: builder.query<KnowledgeGroupRecord, string>({
            query: (args) => ({ url: `/Api/KnowledgeGroups/${args}` }),
            providesTags: tagsFromItem("KnowledgeGroup"),
        }),
        getKnowledgeEntrys: builder.query<KnowledgeEntryRecord[], void>({
            query: () => ({ url: "/Api/KnowledgeEntries" }),
            providesTags: tagsFromList("KnowledgeEntry"),
        }),
        getKnowledgeEntryById: builder.query<KnowledgeEntryRecord, string>({
            query: (args) => ({ url: `/Api/KnowledgeEntries/${args}` }),
            providesTags: tagsFromItem("KnowledgeEntry"),
        }),
    }),
});

export const { useGetAnnouncementsQuery, useGetEventsQuery, useGetEventByIdQuery, useGetDealersQuery } = eurofurenceService;
