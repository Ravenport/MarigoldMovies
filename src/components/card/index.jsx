import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const CardCustom = (props) => {
  const styles = StyleSheet.create({
    cardContainer: {
      width: props.widthCard,
      height: props.heightCard,
      borderRadius: props.borderRadius,
    },
    cardCover: {
      height: props.content ? props.heightCard * 0.8 : props.heightCard,
      borderRadius: props.borderRadius,
    },
    cardContent: {
      padding: 20,
    },
  });

  return <>
    <Card style={[styles.cardContainer, { ...props.styleContainer }]}>
      <Card.Cover testID='cardCover' source={{ uri: props.url }} style={[styles.cardCover, { ...props.styleCover }]} />
      {props.content &&
        <Card.Content style={[styles.cardContent, { ...props.styleContent }]}>
          {props.children}
        </Card.Content>
      }
    </Card>
  </>
}

export default CardCustom;