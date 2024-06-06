import { View, Text } from "react-native";
import React from "react";
import * as DropdownMenu from "zeego/dropdown-menu";
import { RoundButton } from "../round-button";
import { Ionicons } from "@expo/vector-icons";

export const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundButton icon={"ellipsis-horizontal"} text="More" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon androidIconName="list.bullet.rectangle.fill" />
        </DropdownMenu.Item>
        <DropdownMenu.Item key="converter">
          <DropdownMenu.ItemTitle>Converter</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon androidIconName="coloncurrencysign.arrow.circlepath" />
        </DropdownMenu.Item>
        <DropdownMenu.Item key="background">
          <DropdownMenu.ItemTitle>Background</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon androidIconName="coloncurrencysign.arrow.circlepath" />
        </DropdownMenu.Item>
        <DropdownMenu.Item key="account">
          <DropdownMenu.ItemTitle>Account</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon androidIconName="plus.rectange.on.folder.fill" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
