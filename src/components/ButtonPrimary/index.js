import React, {Component} from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles';

class ButtonPrimary extends Component {

    render() {
        return ( 
            <TouchableOpacity style={styles.buttonConfirm} onPress={this.props.onPress}>
                <Text style={styles.textButtonConfirm}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

export default ButtonPrimary