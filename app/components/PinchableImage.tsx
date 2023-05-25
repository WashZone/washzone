import React from 'react'
import { Animated, Dimensions } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'

export const PinchableImage = ({ uri }) => {
    const scale = new Animated.Value(0)
    const onPinchEvent = Animated.event(
        [
            {
                nativeEvent: { scale }
            }
        ],
        {
            useNativeDriver: true
        }
    )

    const onPinchStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        }
    }

    return (
        <PinchGestureHandler
            onGestureEvent={onPinchEvent}
            onHandlerStateChange={onPinchStateChange}>
            <Animated.Image
                source={{ uri }}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    width: Dimensions.get('screen').width,
                    height: 300,
                    transform: [{ scale:1 }]
                }}
                resizeMode='contain'
            />
        </PinchGestureHandler>
    )
}
export default PinchableImage