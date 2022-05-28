// @flow

import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {ScrollView}  from 'react-native-gesture-handler';
import {Colors, Fonts} from '../../utils';

type Props = {
    rowItems?: number,
    items: Array<{label: string, value: number}>,
    onSelect: (value: number) => void,
    initialIdx?: number
}

type State = {
    size: number,
    selected: number
}

export default class HorizontalWheelPicker extends React.Component<Props, State> {
    static defaultProps = {
        rowItems: 5,
        initialIdx: 0
    };

    constructor(props) {
        super(props);

        this.state = {
            size: Dimensions.get('window').width / props.rowItems,
            selected: props.initialIdx,
        };

        this.scrollView = null;
        this.scrollOffset = 0;
        this.isParking = false;
    }

    _calculateLayout = () => {
        this.scrollView.scrollTo({x: this.props.initialIdx * this.state.size, y: 0, animated: false});
    };

    _renderItem = (item, idx) => {
        const {size, selected} = this.state;

        const {label, value} = item;

        return (
            <View
                key={`item-${idx}-${value}`}
                style={[styles.itemContainer, {width: size}]}
            >
                <Text style={[styles.item, (selected === idx) && styles.selected_text]}>
                    {label}
                </Text>
            </View>
        );
    };

    _handleScroll = (event) => {
        this.scrollOffset = event.nativeEvent.contentOffset.x;
    };

    _handleParking = () => {
        const {size} = this.state;
        const {onSelect, items} = this.props;

        this.isParking = true;

        setTimeout(() => {
            if (this.isParking) {
                const selected = this._selectItem();
                this.setState({selected});
                this.isParking = false;
                this.scrollView.scrollTo({y: 0, x: size * selected, animated: true});
                onSelect(items[selected].label);
            }
        }, 150);
    };

    _cancelParking = () => {
        this.isParking = false;
    }

    _selectItem = () => {
        const {items, onSelect} = this.props;
        const {size} = this.state;

        const idx = Math.abs(Math.round(this.scrollOffset / size));
        const selected = idx === items.length ? idx - 1 : idx;

        this.setState({selected});

        onSelect(items[selected].label);
        return selected;
    }

    render() {
        const {items, rowItems} = this.props;
        const {size} = this.state;

        const sideItems = (rowItems - 1) / 2;

        return (
            <View style={styles.main_container}>
                <View
                    style={[styles.highlight, {left: sideItems * size, width: size}]}
                />
                <ScrollView
                    horizontal
                    ref={(ref) => (this.scrollView = ref)}
                    showsHorizontalScrollIndicator={false}
                    onLayout={this._calculateLayout}
                    snapToInterval={size}
                    onScroll={this._handleScroll}
                    onTouchEnd={this._handleParking}
                    onScrollEndDrag={this._handleParking}
                    scrollEventThrottle={16}
                    onMomentumScrollBegin={this._cancelParking}
                    onMomentumScrollEnd={this._selectItem}
                    shouldCancelWhenOutside={false}
                    contentContainerStyle={{paddingHorizontal: size * sideItems}}
                >
                    {items.map((item, idx) => this._renderItem(item, idx))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: '100%',
        flexDirection: 'row',
        height: 60,
        marginVertical: 2
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        fontSize: 20,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE,
        includeFontPadding: false
    },
    selected_text: {
        fontSize: 30,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE,
        includeFontPadding: false
    },
    highlight: {
        height: 60,
        position: 'absolute',
        top: 0,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: Colors.ORANGE_LIGHT
    }
});