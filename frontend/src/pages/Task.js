import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Item,
  Message
} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

import { fetchTask, voteOnTaskReward } from '../actions/tasks'
import { getPendingRewardVote, getTask } from '../reducers/tasks'

import Head from '../components/common/Head'
import Layout from '../components/Layout'
import Tags from '../components/common/Tags'

const TaskRewardInput = ({
  disabled,
  task,
  reward,
  onSubmitReward,
  onChangeReward
}) => (
  <Message>
    <Form onSubmit={event => onSubmitReward(event)}>
      <Form.Field required>
        <label>DID Token Reward</label>
        <Input
          type="text"
          placeholder="positive numeric reward value"
          onChange={event => onChangeReward(event)}
          name="reward"
          value={reward}
        />
      </Form.Field>
      <Button
        disabled={disabled}
        inverted
        size="small"
        color="green"
        type="submit"
      >
        Vote on Reward
      </Button>
    </Form>
  </Message>
)

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reward: '',
      disabled: this.props.pendingRewardVote
    }
  }
  componentWillMount() {
    const { fetchTask, match: { params: { id } } } = this.props
    fetchTask(id)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
    // TODO
    // if (this.props.pendingRewardVote !== nextProps.pendingRewardVote)
    //   return true
    // if (this.state.reward !== nextState.reward)
    //   return true
    // return false
  }

  onChangeReward = ({ target: { value: reward } }) => {
    reward = reward.replace(/\D/g, '')
    this.setState({ reward })
  }

  onSubmitReward = e => {
    e.preventDefault()
    const taskId = this.props.task._id
    const reward = this.state.reward
    this.props.voteOnTaskReward({ taskId, reward })
    this.setState({
      disabled: this.props.pendingRewardVote
    })
  }

  render() {
    const { task } = this.props
    const { disabled, reward } = this.state

    return (
      <Layout>
        <Head title="Task" />
        <div className="task">
          {task ? (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Item>
                    <Item.Content>
                      <Header style={{ textDecoration: 'underline' }} as="h2">
                        {task.title}
                      </Header>
                      <Item.Description>
                        Tags: <Tags tags={task.tags} />
                      </Item.Description>
                      <Item.Description>
                        Issue URL:
                        <a className="" target="_blank" href={task.issueURL}>
                          {task.issueURL}
                        </a>
                      </Item.Description>
                      <Item.Meta>
                        Created: {new Date(task.createdAt).toDateString()}
                      </Item.Meta>
                      <Item.Extra>
                        <Button
                          as={Link}
                          to={`/pullrequests/submit/${task._id}`}
                          color="green"
                          compact
                          size="large"
                        >
                          Submit PR
                        </Button>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column>
                  <TaskRewardInput
                    disabled={disabled}
                    reward={reward}
                    task={task}
                    onChangeReward={this.onChangeReward}
                    onSubmitReward={this.onSubmitReward}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <ReactMarkdown source={task.spec} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : (
            'Loading task...'
          )}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  task: getTask(state, id),
  pendingRewardVote: getPendingRewardVote(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch(fetchTask(id)),
  voteOnTaskReward: (taskId, reward) => dispatch(voteOnTaskReward(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)
