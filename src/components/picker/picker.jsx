import { Picker } from '@react-native-picker/picker';

const PickerCustom = (props) => {
    return (
        <Picker testID='pickerContainer' {...props}>
            <Picker.Item testID='defaultItem' label={props.labelStartValue} value="" />
            {props.children}
        </Picker>
    );
};

const PickerItem = (props) => {
    return <Picker.Item {...props} />
};

export { PickerCustom, PickerItem }