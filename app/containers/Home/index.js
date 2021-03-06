import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { changeAppMode } from '../../redux/actions';
import { fetchAuthors } from 'components/Author/redux/actions';
import { fetchCategories } from 'components/Category/redux/actions';

import Book from 'containers/Book';
import Author from 'containers/Author';
import Category from 'containers/Category';
import NotFoundPage from 'containers/NotFoundPage';

import Navigation from 'components/shared/navigation';
import LinksList from 'components/shared/linksList';

import Notification from 'components/shared/Notification';

class Home extends React.Component {
  componentDidMount() {
    const { fetchCategories, fetchAuthors } = this.props;
    fetchAuthors();
    fetchCategories();
  }

  render() {
    const { authors, categories, changeAppMode, isAppInEditMode } = this.props;

    const authorsList = authors.map(author => {
      return {
        title: author.name,
        url: `/author/${author.id}`,
      };
    });

    const categoriesList = categories.map(category => {
      return {
        title: category.name,
        url: `/category/${category.id}`,
      };
    });

    return (
      <div className="container is-fluid">
        <Helmet>
          <title>Book App - List</title>
        </Helmet>
        <Navigation
          mode={{
            changeAppMode: changeAppMode,
            isAppInEditMode: isAppInEditMode,
          }}
        />
        <Notification />
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <LinksList title="Categories" items={categoriesList} />
              <LinksList title="Authors" items={authorsList} />
            </div>

            <div className="column">
              <Switch>
                <Route exact path="/" component={Book} />
                <Route path={`/book/:mode(new)`} component={Book} />
                <Route
                  path={`/book/:id([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/:mode(edit)?`}
                  component={Book}
                />

                <Route path={`/author/:mode(new)`} component={Author} />
                <Route
                  path={`/author/:id([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/:mode(edit)?`}
                  component={Author}
                />

                <Route path={`/category/:mode(new)`} component={Category} />
                <Route
                  path={`/category/:id/:mode(edit)?`}
                  component={Category}
                />

                <Route
                  component={match => (
                    <div className="columns">
                      <div className="column">
                        <NotFoundPage />
                      </div>
                    </div>
                  )}
                />
              </Switch>
            </div>
          </div>

          <footer className="footer">
            <div className="content has-text-centered">
              <p>
                Front-End Stack Developed Using React, Redux, styled-components
                and Bulma UI Framework.
                <br />
                Back-End Developed Using Node.js and LowDB.
              </p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

function mapStoreToProps(store) {
  return {
    isAppInEditMode: store.global.isAppInEditMode,
    authors: store.author.items,
    categories: store.category.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeAppMode: () => {
      dispatch(changeAppMode());
    },
    fetchAuthors: () => {
      dispatch(fetchAuthors());
    },
    fetchCategories: () => {
      dispatch(fetchCategories());
    },
  };
}

export default withRouter(
  connect(
    mapStoreToProps,
    mapDispatchToProps,
  )(Home),
);
