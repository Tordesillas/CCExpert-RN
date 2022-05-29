import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation, WithTranslation} from 'react-i18next';
import {Picker} from '../../components';
import {Colors, HeroCategories} from '../../utils';

interface Props extends WithTranslation {}

interface State {
    heroCategory: HeroCategories;
}

class TalentLevel extends React.Component<Props, State> {
    constructor(props: Props) {
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
                        {value: HeroCategories.ORDINARY, label: t(`common.hero-categories.${HeroCategories.ORDINARY}`)}
                    ]}
                    onValueChange={(heroCategory) => this.setState({heroCategory: HeroCategories[heroCategory as keyof typeof HeroCategories]})}
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
