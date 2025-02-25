import React, {FunctionComponent} from 'react';
import {Pressable, View} from 'react-native';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {tabTitleHeaderStyles} from './styles';
import {TabTitleHeaderProps} from './type';

const AppTabTitleHeader: FunctionComponent<TabTitleHeaderProps> = ({
  screenTitle,
  onPressRight,
  rightContent,
  rightTitle,
  titleStyle,
}) => {
  const colors = useColors();
  const styles = tabTitleHeaderStyles({colors});
  return (
    <View style={styles.screenTitle}>
      <AppText text={screenTitle} type={'heading_h1'} style={titleStyle} />
      <View style={styles.right}>
        {rightContent ? (
          <>{rightContent}</>
        ) : (
          <>
            {rightTitle && (
              <Pressable style={styles.right} onPress={onPressRight}>
                <AppText
                  text={rightTitle}
                  color={'highlight_5'}
                  align="right"
                  style={styles.rightTitle}
                  type={'action_l'}
                />
              </Pressable>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default AppTabTitleHeader;
