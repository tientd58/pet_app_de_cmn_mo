import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, Modal, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../utils/constants';

export default class ImageFullScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            modalVisible:  false,
        })
    }

    handleDelete = (uri) => {
        Alert.alert(
            'Xác nhận!',
            'Bạn có chắc chắn muốn xoá ảnh?',
            [
                {text: 'Huỷ bỏ', onPress: () => {}},
                {text: 'Đồng ý', onPress: () => {
                    this.props.onDeleteImage(uri)
                }}
            ]
        )
    }

    renderModal = () => (
        <Modal
            visible={this.props.modalVisible}
            style={styles.modal}
            animationType='fade'
            onClose={() => {}}
            position='center'
            backdrop
        >
            <View style={styles.modalContainer}>
                <View style={[styles.contentContainer]}>
                    <TouchableOpacity style={{marginTop: 30, marginHorizontal: 10}} onPress={this.props.onClose}>
                        <MaterialCommunityIcons name="window-close" size={25} color={colors.WHITE} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 30, marginHorizontal: 10}} onPress={() => this.handleDelete(this.props.uri)}>
                        <Text style={{color: colors.WHITE}}>Xoá</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContent}>
                    <Image style={styles.imageItem} source={{ uri: this.props.uri }} />
                </View>
            </View>    
        </Modal>
    )

    render() {
        console.log(this.props.uri);
        return this.renderModal();
    }
}