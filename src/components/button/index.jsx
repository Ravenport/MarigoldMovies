import * as React from 'react';
import { Button } from 'react-native-paper';
import { TouchableOpacity } from "react-native";
import { Link } from 'expo-router';

const ButtonComponent = (props) => {
  return <Button {...props}>{props.children}</Button>
} 

const CustomButton = (props) => {
  return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
}

const LinkButton = (props) => {
  return <Link {...props}>{props.children}</Link>
}

export { ButtonComponent, CustomButton, LinkButton };