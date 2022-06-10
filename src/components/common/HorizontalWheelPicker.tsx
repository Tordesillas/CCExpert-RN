import React, {PureComponent, ReactNode} from 'react';
import {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {Colors, Fonts} from '../../utils';

interface Props {
    data: number[];
    selectedItem: number;
    itemWidth?: number;
    defaultIndex?: number;
    animatedScrollToDefaultIndex?: boolean;
    onChange?: (position: number) => void;
}

interface State {
    scrollViewWidth: number;
}

export default class HorizontalWheelPicker extends PureComponent<Props, State> {
    static defaultProps = {
        itemWidth: 80
    };

    private paddingSide: number;
    private refScrollView: React.RefObject<ScrollView>;
    private ignoreNextScroll: boolean;
    private timeoutDelayedSnap: number | NodeJS.Timeout;
    private currentPositionX: number;
    private readonly defaultScrollEventThrottle = 16;
    private readonly defaultDecelerationRate = Platform.OS == 'ios' ? 50 : 0.9;
    private readonly defaultSnapTimeout = 200;

    constructor(props: Props) {
        super(props);

        this.paddingSide = 0;
        this.refScrollView = React.createRef();
        this.ignoreNextScroll = false;
        this.timeoutDelayedSnap = 0;
        this.currentPositionX = 0;

        this.state = {
            scrollViewWidth: 0
        };
    }

    private onLayoutScrollView = (e: LayoutChangeEvent) => {
        setTimeout(this.scrollToDefaultIndex, 0);
        const {width} = e.nativeEvent.layout;
        this.setState(() => ({scrollViewWidth: width}));
        this.paddingSide = width / 2 - this.props.itemWidth! / 2;
    }

    private onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        this.currentPositionX = e.nativeEvent.contentOffset.x;
    }

    private onScrollBeginDrag = () => {
        this.ignoreNextScroll = false;
    }

    private onScrollEndDrag = () => {
        this.cancelDelayedSnap();
        if (this.ignoreNextScroll) {
            this.ignoreNextScroll = false;
        } else {
            this.setDelayedSnap();
        }
    }

    private onMomentumScrollBegin = () => {
        this.ignoreNextScroll = false;
        this.setDelayedSnap();
    }

    private onMomentumScrollEnd = () => {
        if (this.ignoreNextScroll) {
            this.ignoreNextScroll = false;
        } else {
            this.setDelayedSnap();
        }
    }

    public scrollToPosition = (position: number) => {
        const {itemWidth, onChange} = this.props;
        const x = position * itemWidth!;
        this.ignoreNextScroll = true;

        if (this.refScrollView.current != null) {
            this.refScrollView.current.scrollTo({x, y: 0, animated: true});
        }

        if (onChange != null) {
            if (position < 1) {
                onChange(0);
            } else if (position > this.props.data.length) {
                onChange(this.props.data.length - 1);
            } else {
                onChange(position);
            }
        }
    }

    private cancelDelayedSnap = () => {
        clearTimeout(this.timeoutDelayedSnap as NodeJS.Timeout);
    }

    private setDelayedSnap = (timeout?: number) => {
        const {itemWidth} = this.props;
        const snapTimeout = timeout || this.defaultSnapTimeout;
        this.cancelDelayedSnap();
        this.timeoutDelayedSnap = setTimeout(() => {
            const nextPosition = Math.round(this.currentPositionX / itemWidth!);
            this.scrollToPosition(nextPosition);
        }, snapTimeout);
    }

    scrollToDefaultIndex = () => {
        if (this.refScrollView.current != null && this.props.defaultIndex != null) {
            const {defaultIndex, itemWidth, data} = this.props;

            if (defaultIndex >= data.length) {
                return;
            }

            const x = defaultIndex * itemWidth!;
            this.refScrollView.current.scrollTo({x, y: 0, animated: this.props.animatedScrollToDefaultIndex || false});
        }
    }

    renderItem(item: any): ReactNode {
        const {itemWidth, selectedItem} = this.props;

        return (
            <View style={[styles.item_container, {width: itemWidth}]}>
                <Text style={[styles.item, (selectedItem === item) && styles.selected_text]}>
                    {item}
                </Text>
            </View>
        );
    }

    render() {
        const {data} = this.props;

        return (
            <>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={this.defaultScrollEventThrottle}
                    decelerationRate={this.defaultDecelerationRate}
                    contentContainerStyle={{paddingHorizontal: this.paddingSide}}
                    ref={this.refScrollView}
                    onLayout={this.onLayoutScrollView}
                    onScroll={this.onScroll}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                    onMomentumScrollBegin={this.onMomentumScrollBegin}
                    onMomentumScrollEnd={this.onMomentumScrollEnd}
                >
                    {data.map((item: any, index: number) => (
                        <TouchableWithoutFeedback onPress={() => this.scrollToPosition(index)} key={index}>
                            {this.renderItem(item)}
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>

                <View style={styles.highlight_wrapper} pointerEvents='none'>
                    <View style={styles.highlight}/>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    item_container: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        fontSize: 20,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.GREY_LIGHT,
        includeFontPadding: false
    },
    selected_text: {
        fontSize: 30,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE,
        includeFontPadding: false
    },
    highlight_wrapper: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    highlight: {
        width: 60,
        height: 65,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: Colors.ORANGE_LIGHT
    }
});