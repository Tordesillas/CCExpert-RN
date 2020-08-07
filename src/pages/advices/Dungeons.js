// @flow

import React from 'react';
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {withTranslation} from 'react-i18next';
import {WheelPicker} from '../../components';
import Sets from '../../models/Sets';
import {Colors, Images} from '../../utils';

class Dungeons extends React.Component {
    constructor(props) {
        super(props);

        this.pickerSize = (Dimensions.get('window').width - 8) / 2;

        this.door = '1';
        this.base = '1';

        this.state = {
            f2pVideo: null,
            p2wVideo: null,
            dungeonImage: Images.dungeon1
        };
    }

    componentDidMount() {
        this.searchVideo();
    }

    searchVideo() {
        const videosAvailable = Sets.get().dungeons.filter(dungeon => dungeon.base === parseInt(this.base) && dungeon.door === parseInt(this.door));
        const f2pVideo = videosAvailable.filter(dungeon => dungeon.f2p)[0] || null;
        const p2wVideo = videosAvailable.filter(dungeon => !dungeon.f2p)[0] || null;

        this.setState({f2pVideo, p2wVideo});
    }

    render() {
        const {navigation, t} = this.props;
        const {f2pVideo, p2wVideo, dungeonImage} = this.state;

        return (
            <SafeAreaView style={styles.main_container}>
                <ScrollView contentContainerStyle={styles.main_wrapper}>
                    <View style={styles.wrapper}>
                        <View style={styles.wheel_container}>
                            <Image
                                source={dungeonImage}
                                style={[styles.image, {width: this.pickerSize}]}
                                resizeMode="contain"
                                fadeDuration={0}
                            />
                            <View style={{flex: 1}}>
                                <WheelPicker
                                    dataSource={['1', '2', '3', '4', '5', '6', '7', '8']}
                                    onValueChange={(value) => {
                                        this.door = value;
                                        this.searchVideo();
                                        this.setState({dungeonImage: Images[`dungeon${value}`]});
                                    }}
                                    height={400}
                                    width={this.pickerSize}
                                />
                            </View>
                        </View>
                        <View style={styles.wheel_container}>
                            <Image
                                source={Images.dungeon_logo}
                                style={[styles.image, {width: this.pickerSize}]}
                                resizeMode="contain"
                                fadeDuration={0}
                            />
                            <WheelPicker
                                dataSource={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                                onValueChange={(value) => {
                                    this.base = value;
                                    this.searchVideo();
                                }}
                                height={400}
                                width={this.pickerSize}
                            />
                        </View>
                    </View>

                    <View style={styles.buttons_container}>
                        <View style={styles.button_container}>
                            {f2pVideo && (
                                <RectButton style={styles.button} onPress={() => navigation.navigate('Dungeon', {dungeon: f2pVideo})}>
                                    <Text style={styles.button_text}>{t('dungeons.f2p-video')}</Text>
                                </RectButton>
                            )}
                        </View>
                        <View style={styles.button_container}>
                            {p2wVideo && (
                                <RectButton style={styles.button} onPress={() => navigation.navigate('Dungeon', {dungeon: p2wVideo})}>
                                    <Text style={styles.button_text}>{t('dungeons.p2w-video')}</Text>
                                </RectButton>
                            )}
                        </View>
                    </View>
                    {!f2pVideo && !p2wVideo && (
                        <Text style={styles.no_video}>{t('dungeons.no-video-available')}</Text>
                    )}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default withTranslation()(Dungeons);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY,
        padding: 2
    },
    main_wrapper: {
        flexDirection: 'column'
    },
    wrapper: {
        flexDirection: 'row'
    },
    wheel_container: {
        flex: 1,
        flexDirection: 'column',
        margin: 2,
        borderRadius: 2,
        backgroundColor: Colors.BLACK_LIGHT,
        alignItems: 'center'
    },
    image: {
        height: 100,
        aspectRatio: 1,
        marginVertical: 4
    },
    buttons_container: {
        flex: 1,
        flexDirection: 'row'
    },
    button_container: {
        flex: 1
    },
    button: {
        flex: 1,
        height: 60,
        borderRadius: 30,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BLACK_LIGHT,
        elevation: 2,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1}
    },
    button_text: {
        fontSize: 14,
        color: Colors.ORANGE_LIGHT
    },
    no_video: {
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 14,
        color: Colors.ORANGE_LIGHT
    }
});