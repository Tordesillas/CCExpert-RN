import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../utils';

interface Props {
    dataSource: Array<number>;
    initialSelectedIndex?: number;
    onValueChange: (data: number, selectedIndex: number) => void;
    renderItem?: (data: number, index: number, isSelected: boolean) => any;
    width: number;
    height: number;
    itemHeight?: number;
    highlightColor?: string;
    highlightBorderWidth?: number;
}

interface State {
    selectedIndex?: number;
}

export default class VerticalWheelPicker extends React.Component<Props, State> {
    static defaultProps = {
        initialSelectedIndex: 0,
        height: 180,
        width: 150,
        itemHeight: 80,
        highlightColor: Colors.ORANGE,
        highlightBorderWidth: 2
    };

    momentumStarted?: boolean;
    sview?: ScrollView | null;

    constructor(props: Props) {
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
        this.scrollFix(event);
    }

    scrollFix(event: any) {
        let verticalY = 0;
        const {selectedIndex: stateSelectedIndex} = this.state;
        const {itemHeight: h, dataSource, onValueChange} = this.props;

        if (event.nativeEvent.contentOffset) {
            verticalY = event.nativeEvent.contentOffset.y;
        }
        let selectedIndex = Math.round(verticalY / h!);
        let verticalElem = selectedIndex * h!;
        if (selectedIndex >= dataSource.length) {
            selectedIndex = dataSource.length - 1;
            verticalElem = (dataSource.length - 1) * h!;
        }
        if (verticalElem !== verticalY) {
            this.sview!.scrollTo({y: verticalElem});
        }

        if (stateSelectedIndex !== selectedIndex) {
            this.setState({selectedIndex});
            if (onValueChange) {
                const selectedValue = dataSource[selectedIndex];
                onValueChange(selectedValue, selectedIndex);
            }
        }
    }

    renderItem(data: any, index: any) {
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
                        top: (height - itemHeight!) / 2,
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
                    onMomentumScrollBegin={() => this.onMomentumScrollBegin()}
                    onMomentumScrollEnd={(event) => this.onMomentumScrollEnd(event)}
                    nestedScrollEnabled={true}
                >
                    <View
                        style={{height: (height - itemHeight!) / 2, flex: 1}}
                    />
                    {dataSource.map((data, index) => this.renderItem(data, index))}
                    <View
                        style={{height: (height - itemHeight!) / 2, flex: 1}}
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
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE,
        includeFontPadding: false
    },
    selected_item_text: {
        fontSize: 30,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE,
        includeFontPadding: false
    }
});