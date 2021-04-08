import { useState, useEffect } from 'react';
import { AuthConsumer } from '../../providers/AuthProvider';
import { Form, Grid, Image, Button, Header, Container } from 'semantic-ui-react';
const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';
const Profile = ({ user, updateUser }) => {
  const [editing, setEditing] = useState(false)
  const [formVals, setFormVals] = useState({ name: '', email: '' })
  useEffect ( () => {
    const { name, email, image } = user
    setFormVals({ name, email, image })
  }, [])
  const profileView = () => {
    return(
      <>
        <Grid.Column width={4}>
          <Image src={user.image || defaultImage} />
        </Grid.Column>
        <Grid.Column width={12}>
          <Header>{user.name}</Header>
          <Header>{user.email}</Header>
        </Grid.Column>
      </>
    )
  }
  const editView = () => {
    return(
      <Form onSubmit={handleSubmit}>
        <Grid.Column width={4}>
          {/* img upload */}
        </Grid.Column>
        <Grid.Column width={8}>
          <Form.Input
            label="Name"
            name="name"
            value={formVals.name}
            required
            onChange={(e, inputAttr) => setFormVals({ ...formVals, name: inputAttr.value})}
          />
          <Form.Input
            label="Email"
            name="email"
            value={formVals.email}
            required
            onChange={(e, inputAttr) => setFormVals({ ...formVals, email: inputAttr.value})}
          />
          <Button>Update</Button>
        </Grid.Column>
      </Form>
    )
  }
  const handleSubmit = (e) => {
  }
  return (
    <Container>
      <Grid>
        <Grid.Row>
          { editing ? editView() : profileView() }
          <Grid.Column>
            <Button onClick={() => setEditing(!editing)}>
              { editing ? 'Cancel' : 'Edit'}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}
const ConnectedProfile = (props) => (
  <AuthConsumer>
    { auth => 
      <Profile { ...props } { ...auth } />
    }
  </AuthConsumer>
)
export default ConnectedProfile;