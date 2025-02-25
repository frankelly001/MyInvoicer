constructor(props) {
    super(props);
  
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }
  
  ...
    
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    
    ...
  
    <ScrollView
      style={styles.fill}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
      )}
    >
      ...
    </ScrollView>
    <Animated.View style={[styles.header, {height: headerHeight}]}>
      ...
    </Animated.View>
    ...
  }