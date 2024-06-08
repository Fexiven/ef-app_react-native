import { useNavigation } from "@react-navigation/core";
import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Row } from "./Row";
import { useThemeBackground, useThemeBorder, useThemeColorValue } from "../../../hooks/themes/useThemeHooks";
import { Activity } from "../atoms/Activity";
import { Icon } from "../atoms/Icon";
import { Label } from "../atoms/Label";

const iconSize = 32;

export type HeaderProps = ViewProps;

export const Header: FC<HeaderProps> = ({ style, children }) => {
    const colorValue = useThemeColorValue("text");
    const styleBackground = useThemeBackground("background");
    const styleBorder = useThemeBorder("darken");

    const navigation = useNavigation();

    return (
        <Row style={[styles.container, styleBackground, styleBorder, style]} type="center" variant="spaced">
            <Icon name="chevron-left" size={iconSize} color={colorValue} />

            <Label style={styles.text} type="lead" ellipsizeMode="tail" numberOfLines={1}>
                {children}
            </Label>

            <View style={styles.placeholder} />

            <TouchableOpacity containerStyle={styles.back} onPress={() => navigation.goBack()} />

            <Activity style={styles.activity} />
        </Row>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    text: {
        flex: 1,
    },
    placeholder: {
        width: iconSize,
        height: iconSize,
    },
    back: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "30%",
    },
    activity: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
    },
});
