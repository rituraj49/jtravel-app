import { useState } from "react";
import { Button, Menu } from "react-native-paper";

type MenuDropdownProps = {
    items: string[];
    selectedItem: string;
    label: string;
    type: string;
    handleChange: (type: string) => (value: string) => void;
}

export default function MenuDropdown({ items, selectedItem, label, type, handleChange }: MenuDropdownProps) {
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    return (
       <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            style={{marginTop: 45, marginLeft: -10}}
            anchor={
            <Button
                mode="outlined"  
                style={{borderRadius: 4}}
                onPress={openMenu}
                icon="chevron-down"
                contentStyle={{ flexDirection: 'row-reverse' }}
            >
                {selectedItem || label}
            </Button>
            }>
            {items.map((item: string) => (
                <Menu.Item
                    key={item}
                    onPress={() => {
                        handleChange(type)(item);
                        closeMenu();
                    }}
                    title={item}
                />
            ))}
        </Menu>
    );
}