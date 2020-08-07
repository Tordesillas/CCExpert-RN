// @flow

import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../utils';

type Props = {
    dataSource: Array<string>,
    initialSelectedIndex?: number,
    onValueChange: (data: string, selectedIndex: number) => void,
    renderItem?: (data: string, index: number, isSelected: boolean) => any,
    width: number,
    height: number,
    itemHeight?: number,
    highlightColor?: string,
    highlightBorderWidth?: number,
    style?: StyleSheet.style
}

type State = {
    selectedIndex: number
}

export default class WheelPicker extends React.Component<Props, State> {
    static defaultProps = {
        initialSelectedIndex: 0,
        height: 180,
        width: 150,
        itemHeight: 80,
        highlightColor: Colors.ORANGE,
        highlightBorderWidth: 2
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: props.initialSelectedIndex
        };
    }

    onMomentumScrollBegin() {
        this.momentumStarted = true;
    }

    onMomentumScrollEnd(event: any) {
        this.momentumStarted = false;
        if (!this.isScrollTo) {
            this.scrollFix(event);
        }
    }

    scrollFix(event: any) {
        let verticalY = 0;
        const {selectedIndex: stateSelectedIndex} = this.state;
        const {itemHeight: h, dataSource, onValueChange} = this.props;

        if (event.nativeEvent.contentOffset) {
            verticalY = event.nativeEvent.contentOffset.y;
        }
        let selectedIndex = Math.round(verticalY / h);
        let verticalElem = selectedIndex * h;
        if (selectedIndex >= dataSource.length) {
            selectedIndex = dataSource.length - 1;
            verticalElem = (dataSource.length - 1) * h;
        }
        if (verticalElem !== verticalY) {
            if (Platform.OS === 'ios') {
                this.isScrollTo = true;
            }
            this.sview.scrollTo({y: verticalElem});
        }

        if (stateSelectedIndex !== selectedIndex) {
            this.setState({selectedIndex});
            if (onValueChange) {
                const selectedValue = dataSource[selectedIndex];
                onValueChange(selectedValue, selectedIndex);
            }
        }
    }

    renderItem(data, index) {
        const {selectedIndex} = this.state;
        const {itemHeight} = this.props;

        return (
            <View key={index} style={[styles.item, {height: itemHeight}]}>
                <Text style={index === selectedIndex ? styles.selected_item_text : styles.item_text}>
                    {data}
                </Text>
            </View>
        );
    }

    render() {
        const {height, width, highlightColor, itemHeight, highlightBorderWidth, dataSource} = this.props;

        return (
            <View style={{height, width}}>
                <View
                    style={[styles.highlight_view, {
                        top: (height - itemHeight) / 2,
                        height: itemHeight,
                        width: width - 8,
                        borderColor: highlightColor,
                        borderTopWidth: highlightBorderWidth,
                        borderBottomWidth: highlightBorderWidth,
                        marginHorizontal: 4
                    }]}
                />
                <ScrollView
                    style={{height, width}}
                    ref={(sview) => this.sview = sview}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onMomentumScrollBegin={(event) => this.onMomentumScrollBegin(event)}
                    onMomentumScrollEnd={(event) => this.onMomentumScrollEnd(event)}
                    nestedScrollEnabled={true}
                >
                    <View
                        style={{height: (height - itemHeight) / 2, flex: 1}}
                    />
                    {dataSource.map((data, index) => this.renderItem(data, index))}
                    <View
                        style={{height: (height - itemHeight) / 2, flex: 1}}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    highlight_view: {
        position: 'absolute'
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    item_text: {
        fontSize: 20,
        color: Colors.WHITE
    },
    selected_item_text: {
        fontSize: 30,
        color: Colors.WHITE
    }
});
