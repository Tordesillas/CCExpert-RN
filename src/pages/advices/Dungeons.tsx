import React from 'react';
import {Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {withTranslation, WithTranslation} from 'react-i18next';
import _ from 'lodash';
import {NavigationProp} from '@react-navigation/native';
import {VerticalWheelPicker} from '../../components';
import Sets from '../../models/Sets';
import Dungeon from '../../models/Dungeon';
import {Colors, Fonts, Images} from '../../utils';

interface Props extends WithTranslation {
    navigation: NavigationProp<any>;
}

interface State {
    f2pVideo: Dungeon | null;
    p2wVideo: Dungeon | null;
    dungeonImage: number;
}

class Dungeons extends React.Component<Props, State> {
    pickerSize: number;
    door: number;
    base: number;

    constructor(props: Props) {
        super(props);

        this.pickerSize = (Dimensions.get('window').width - 8) / 2;

        this.door = 1;
        this.base = 1;

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
        const videosAvailable = Sets.get().dungeons.filter(dungeon => (dungeon.base === this.base) && (dungeon.door === this.door));
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
                                <VerticalWheelPicker
                                    dataSource={_.range(1, 9)}
                                    onValueChange={(value) => {
                                        this.door = value;
                                        this.searchVideo();
                                        this.setState({dungeonImage: Images[`dungeon${value}` as keyof typeof Images]});
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
                            <VerticalWheelPicker
                                dataSource={_.range(1, 11)}
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
                        {f2pVideo && (
                            <View style={styles.button_wrapper}>
                                <Pressable
                                    style={styles.button}
                                    android_ripple={{color: 'rgba(255,163,26,0.12)'}}
                                    onPress={() => navigation.navigate('Dungeon', {dungeon: f2pVideo})}
                                >
                                    <Text style={styles.button_text}>{t('dungeons.f2p-video')}</Text>
                                </Pressable>
                            </View>
                        )}

                        {p2wVideo && (
                            <View style={styles.button_wrapper}>
                                <Pressable
                                    style={styles.button}
                                    android_ripple={{color: 'rgba(255,163,26,0.12)'}}
                                    onPress={() => navigation.navigate('Dungeon', {dungeon: p2wVideo})}
                                >
                                    <Text style={styles.button_text}>{t('dungeons.p2w-video')}</Text>
                                </Pressable>
                            </View>
                        )}
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
    button_wrapper: {
        flex: 1,
        height: 60,
        margin: 10,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: Colors.BLACK_LIGHT,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1},
        elevation: 2
    },
    button: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_text: {
        fontSize: 12,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.ORANGE_LIGHT
    },
    no_video: {
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 10,
        textAlign: 'center',

        fontSize: 12,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.ORANGE_LIGHT
    }
});