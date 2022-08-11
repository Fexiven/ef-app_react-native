import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { orderBy } from "lodash";
import moment from "moment";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Label } from "../../components/Atoms/Label";
import { Section } from "../../components/Atoms/Section";
import { Col } from "../../components/Containers/Col";
import { localeForMoment } from "../../i18n";
import { useAppDispatch, useAppSelector } from "../../store";
import { setAnalytics, toggleDevMenu } from "../../store/settings.slice";

type Language = {
    code: string;
    name: string;
};
const languages = orderBy(
    [
        { code: "en", name: "🇬🇧 English" },
        { code: "de", name: "🇩🇪 Deutsch" },
        { code: "nl", name: "🇳🇱 Nederlands" },
    ] as Language[],
    (value) => value.code,
    "asc"
);
export const UserSettings = () => {
    const { t, i18n } = useTranslation("Settings");
    const dispatch = useAppDispatch();
    const analyticsEnabled = useAppSelector((state) => state.settingsSlice.analytics.enabled);

    return (
        <View>
            <Section title={t("settingsSection")} icon={"cog"} />
            <SettingItem>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => dispatch(setAnalytics(!analyticsEnabled))}
                    onLongPress={() =>
                        Alert.alert(t("developer_settings_alert.title"), t("developer_settings_alert.body"), [
                            {
                                text: t("developer_settings_alert.cancel"),
                                onPress: () => dispatch(toggleDevMenu()),
                                style: "cancel",
                            },
                            {
                                text: t("developer_settings_alert.disable"),
                                onPress: () => dispatch(toggleDevMenu(false)),
                                style: "default",
                            },
                            {
                                text: t("developer_settings_alert.enable"),
                                onPress: () => dispatch(toggleDevMenu(true)),
                                style: "destructive",
                            },
                        ])
                    }
                    delayLongPress={5000}
                >
                    <Col style={{ flex: 1 }}>
                        <Label variant={"bold"}>{t("allowAnalytics")}</Label>
                        <Label variant={"narrow"}>{t("allowAnalyticsSubtitle")}</Label>
                    </Col>

                    <Checkbox value={analyticsEnabled} />
                </TouchableOpacity>
            </SettingItem>
            <SettingItem>
                <Label variant={"bold"}>{t("changeLanguage")}</Label>
                <Label variant={"narrow"}>{t("currentLanguage")}</Label>
                <Picker<string>
                    selectedValue={i18n.language}
                    prompt={t("changeLanguage")}
                    onValueChange={(it) => {
                        i18n.changeLanguage(it);
                        moment.locale(localeForMoment(it));
                    }}
                >
                    {languages.map((it) => (
                        <Picker.Item label={it.name} value={it.code} key={it.code} />
                    ))}
                </Picker>
            </SettingItem>
        </View>
    );
};

const SettingItem: FC = ({ children }) => <View style={{ marginVertical: 10 }}>{children}</View>;
