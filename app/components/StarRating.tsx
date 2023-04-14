import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme';

export const StarRating = ({ onPress, disabled, size, initialVal }: {
    onPress?: (n: number) => void, disabled?: boolean, size?: number, initialVal?: number
}) => {
    const starRatingOptions = [1, 2, 3, 4, 5];

    useEffect(() => {
        setStarRating(initialVal)
    }, [initialVal])


    const [starRating, setStarRating] = useState(initialVal);

    const animatedButtonScale = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 1.5,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const animatedScaleStyle = {
        transform: [{ scale: animatedButtonScale }],
    };

    return (
        <View style={styles.stars}>
            {starRatingOptions.map((option) => (
                <TouchableWithoutFeedback
                    disabled={disabled}
                    onPressIn={() => handlePressIn()}
                    onPressOut={() => handlePressOut()}
                    onPress={() => { setStarRating(option); onPress(option) }}
                    key={option}
                >
                    <Animated.View style={animatedScaleStyle}>
                        <MaterialIcons
                            name={starRating >= option ? 'star' : 'star-border'}
                            size={size || 32}
                            style={starRating >= option ? styles.starSelected : styles.starUnselected}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
            ))}
        </View>

    );
}
export default StarRating

const styles = StyleSheet.create({
    starSelected: {
        color: colors.palette.primary100,
    },
    starUnselected: {
        color: colors.palette.neutral200,
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
    },
});
