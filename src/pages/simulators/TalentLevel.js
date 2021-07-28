// @flow

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation} from 'react-i18next';
import {Picker} from '../../components';
import {Colors, HeroCategories} from '../../utils';

type State = {
    heroCategory: HeroCategories
}

class TalentLevel extends React.Component<{}, State> {
    constructor(props) {
        super(props);

        this.state = {
            heroCategory: HeroCategories.EPIC
        };
    }

    render() {
        const {t} = this.props;
        const {heroCategory} = this.state;

        return (
            <SafeAreaView style={styles.main_container}>
                <Picker
                    value={heroCategory}
                    items={[
                        {value: HeroCategories.EPIC, label: t(`common.hero-categories.${HeroCategories.EPIC}`)},
                        {value: HeroCategories.LEGENDARY, label: t(`common.hero-categories.${HeroCategories.LEGENDARY}`)},
                        {value: HeroCategories.ELITE, label: t(`common.hero-categories.${HeroCategories.ELITE}`)},
                        {value: HeroCategories.ORDINARY, label: t(`common.hero-categories.${HeroCategories.ORDINARY}`)},
                    ]}
                    onValueChange={(heroCategory) => this.setState({heroCategory})}
                    title={t('talent-level.hero-category')}
                />
            </SafeAreaView>
        );
    }
}

export default withTranslation()(TalentLevel);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    }
});
