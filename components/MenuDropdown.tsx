import { theme } from "@/themes/theme";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Menu, TextInput } from "react-native-paper";

type MenuDropdownProps = {
    items: string[];
    selectedItem: string;
    label: string;
    type: string;
    handleChange: (type: string) => (value: string) => void;
    styles: any;
    icon?: string;
}

export default function MenuDropdown({ items, selectedItem, label, type, handleChange, styles, icon }: MenuDropdownProps) {
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    return (
        <View style={selectedItem ? { backgroundColor: theme.colors.transparent } : {}}>
            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                style={styles}
                // contentStyle={{ backgroundColor: theme.colors.transparent }}
                anchor={
                     <TouchableOpacity onPress={openMenu}>
                        <View pointerEvents="none">
                        <TextInput
                            label={selectedItem ? "" : label}
                            value={selectedItem ? selectedItem : ""}
                            mode="flat"
                            style={[{ backgroundColor: theme.colors.transparent }]}
                            left={icon ? <TextInput.Icon icon={icon} /> : ""}
                            right={<TextInput.Icon icon="chevron-down" />}
                        />
                        </View>
                    </TouchableOpacity>
                    // <Button
                    //     mode="outlined"
                    //     style={{ borderRadius: 4 }}
                    //     onPress={openMenu}
                    //     icon="chevron-down"
                    //     contentStyle={{ flexDirection: 'row-reverse' }}
                    //     labelStyle={selectedItem ? { fontWeight: 'bold' } : {}}
                    // >
                    //     {selectedItem || label}
                    // </Button>
                }>
                {items.map((item: string) => (
                    <View key={item} style={{  }}>
                        <Menu.Item
                            // key={item}
                            onPress={() => {
                                handleChange(type)(item);
                                closeMenu();
                            }}
                            title={item}
                        />
                    </View>
                ))}
            </Menu>
        </View>
    );
}