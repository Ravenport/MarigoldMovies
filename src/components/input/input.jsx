import * as React from 'react';
import { TextInput } from 'react-native-paper';

const Input = (props) => {
    return (
        <TextInput
            testID='input'
            label={props.label}
            value={props.value}
            onChangeText={(text) => { props.onChangeText(text) }}
            {...props}
        />
    );
};

export default Input;