import React, {Component} from 'react'
import {Card, Icon, Image, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class RecipeCard extends Component {
  render() {
    const {recipe} = this.props
    const {id, imageUrl, title, prepTime} = recipe

    return (
      <Container>
        <Card as={Link} to={`/recipes/${id}`}>
          <Image src={imageUrl} />
          <Card.Content>
            <Card.Header> {title}</Card.Header>
            <Card.Meta>{prepTime}</Card.Meta>
            <Card.Description/>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="heart" />
            </a>
            <a>
              <Icon name="ban" />
            </a>
          </Card.Content>
        </Card>
      </Container>
    )
  }
}

export default RecipeCard
