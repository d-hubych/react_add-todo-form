import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

const copyTodos = [...todos];

export class App extends React.Component <{}, {}> {
  state = {
    title: '',
    userId: 0,
    noUser: false,
    noTitle: false,
  };

  handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userId: Number(value),
      noUser: false,
    });
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      noTitle: false,
    });
  };

  submitForm = () => {
    const {
      title, userId, noUser, noTitle,
    } = this.state;

    if (userId !== 0 && title !== '') {
      copyTodos.push(
        {
          userId: +userId,
          title,
          id: copyTodos.length + 1,
          completed: false,
        },
      );

      this.setState({
        title: '',
        userId: 0,
      });
    } else {
      if (!noUser) {
        this.setState({ noUser: true });
      }

      if (!noTitle) {
        this.setState({ noTitle: true });
      }
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Add TODO form</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          action=""
          method="post"
          className="form"
        >
          <div className="wraper">
            <select
              name="user"
              value={this.state.userId}
              onChange={this.handleChangeUser}
              className="form__user"
            >
              <option value="0">
                Choose a user
              </option>
              {
                users.map((user) => {
                  return (
                    <option
                      value={user.id}
                      key={user.id}
                    >
                      {user.name}
                    </option>
                  );
                })
              }
            </select>
            <div>
              { this.state.noUser
              && (
                <span className="form__error">
                  Please choose a user
                </span>
              ) }
            </div>
          </div>

          <div className="wraper">
            <input
              type="text"
              name="title"
              placeholder="Enter title here"
              value={this.state.title}
              onChange={this.handleChangeTitle}
              className="form__title"
            />
            { this.state.noTitle
            && (
              <span className="form__error">
                Please enter the title
              </span>
            ) }
          </div>

          <button
            type="button"
            onClick={
              this.submitForm
            }
            className="form__button"
          >
            Add
          </button>
        </form>
        <ul className="list">
          {
            copyTodos.map((todo => {
              return (
                <li className="list__item">
                  <p>
                    {`Title: ${todo.title}`}
                  </p>
                  <p>
                    {`To do ID: ${todo.id}`}
                  </p>
                </li>
              );
            }))
          }
        </ul>
      </div>
    );
  }
}
