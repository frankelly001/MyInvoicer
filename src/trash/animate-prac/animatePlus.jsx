const imageOpacity = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });
  
  ...
  
  <ScrollView>
    ...
  </ScrollView>
  <Animated.View style={[styles.header, {height: headerHeight}]}>
    <Animated.Image
      style={[
        styles.backgroundImage,
        {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
      ]}
      source={require('./images/cat.jpg')}
    />
    <Animated.View>
      ...
    </Animated.View>
  </Animated.View>
  
  ...
  
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
    
  ...