import React, { Component } from 'react'
import { connect } from 'react-redux'


class Dashboard extends Component {

  state = {
    showAnswered: false,
  }

  showUnanswered = () => {
    this.setState(() => ({ showAnswered: false }))
  }

  showAnswered = () => {
    this.setState(() => ({ showAnswered: true }))
  }

  render() {
    const { showAnswered } = this.state
    const { answeredPolls, unansweredPolls } = this.props
    const list = showAnswered === true
      ? answeredPolls
      : unansweredPolls
    return (
      <div>
        <div className='dashboard-toggle'>
          <button
            style={{ textDecoration: showAnswered === false ? 'underline' : null }}
            onClick={this.showUnanswered}>
            Unanswered
          </button>
          <span> | </span>
          <button
            style={{ textDecoration: showAnswered === true ? 'underline' : null }}
            onClick={this.showAnswered}>
            Answered
          </button>
        </div>
        <ul className='dashboard-list'>
          {list.map((poll) => <li key={poll.id}>{poll.question}</li>)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, polls, users }) {
  const answers = users[authedUser].answers

  const answeredPolls = answers
    .map((id) => polls[id])
    .sort((a, b) => b.timestamp - a.timestamp)

  const unansweredPolls = Object.keys(polls)
    .filter(id => !answers.includes(id))
    .map((id) => polls[id])
    .sort((a, b) => b.timestamp - a.timestamp)
  return {
    answeredPolls,
    unansweredPolls,
  }
}

export default connect(mapStateToProps)(Dashboard)