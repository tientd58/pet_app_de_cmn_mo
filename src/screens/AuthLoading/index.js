import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View} from 'react-native';
import styles from './styles';
import { bootstrapAuthorize } from '../../utils/authorization';
import { initStorage } from '../../actions/auth';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        bootstrapAuthorize(props.navigation);
        props.initStorage();
    }

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.contentContainer}>
                <ActivityIndicator size='large' color="#00ff00"/>
            </View>
        );
    }
}

const mapStateToProps = ({ Auth }) => ({
    Auth,
});

const mapDispatchToProps = {
    initStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);