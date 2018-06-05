import { render } from "react-dom";
import Form from "./form";
import "./App.css";
import React, { Component } from "react";
import firebase from "./firebase.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  card: {
    width: 500,
    height: 500
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: 1025
  }),
  rootcard: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: 550
  })
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      company: "",
      contractdetail: "",
      id: "",
      gender: "",
      array: [],
      picture: ""
    };
  }
  updateField = (field, newValue) => {
    this.setState({ [field]: newValue });
  };
  handleClick = event => {
    event.preventDefault();

    var object = {
      name: this.state.name,
      company: this.state.company,
      contractdetail: this.state.contractdetail,
      gender: this.state.gender,
      picture: this.state.picture
    };
    var array2 = this.state.array;
    array2.push(object);
    this.setState({ array: array2 });

    const list = firebase.database().ref("list");
    list.push(object);
  };

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/list/${itemId}`);
    itemRef.remove();
  }

  componentDidMount() {
    const list = firebase.database().ref("list");
    list.on("value", snapshot => {
      let objects = snapshot.val();
      let updatedArray = [];
      for (let obj in objects) {
        if (objects[obj].gender === "male" || objects[obj].gender === "Male") {
          updatedArray.push({
            name: objects[obj].name,
            company: objects[obj].company,
            contractdetail: objects[obj].contractdetail,
            gender: objects[obj].gender,
            id: obj,
            picture:
              "http://emblemsbattlefield.com/uploads/posts/2014/10/facebook-default-photo-male_1.jpg"
          });
        } else if (
          objects[obj].gender === "female" ||
          objects[obj].gender === "Female"
        ) {
          updatedArray.push({
            name: objects[obj].name,
            company: objects[obj].company,
            contractdetail: objects[obj].contractdetail,
            gender: objects[obj].gender,
            id: obj,
            picture:
              "https://i.pinimg.com/236x/8d/90/a9/8d90a954dd2cbd7b67ed7e5b4013c46e.jpg"
          });
        } else {
          updatedArray.push({
            name: objects[obj].name,
            company: objects[obj].company,
            contractdetail: objects[obj].contractdetail,
            gender: "",
            id: obj,
            picture:
              "https://teflhero.files.wordpress.com/2015/05/blank-face.jpg?w=1024"
          });
        }
      }
      this.setState({ array: updatedArray });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <body class="bodycontainer" background="">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">
            Capital One
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>

          <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#">
                  Employees
                </a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="text"
                placeholder="Search"
              />
            </form>
          </div>
        </nav>

        <div className="App">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js" />
          <link
            rel="stylesheet"
            href="https://bootswatch.com/4/cerulean/bootstrap.min.css"
          />

          <div className="formcontainer">
            <Paper className={classes.root} elevation={4}>
              <Form
                className="center"
                updateParent={(field, newValue) =>
                  this.updateField(field, newValue)
                }
                clicker={(name, company, contractdetail, gender, picture) =>
                  this.handleClick(
                    name,
                    company,
                    contractdetail,
                    gender,
                    picture
                  )
                }
              />
            </Paper>
          </div>

          <hr class="aligncenter" height="5px" border-top="4px" />

          <div class="row">
            <div class="col s12 m2 20 ">
              {this.state.array.map(contracts => (
                <div className="horizontal">
                  <Paper className={classes.rootcard} elevation={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image={contracts.picture}
                      />
                      <Typography
                        gutterBottom
                        variant="headline"
                        component="h2"
                      >
                        Name: {contracts.name}
                      </Typography>
                      <p>-{contracts.company}-</p>
                      <p>Contract Details:</p>
                      <CardContent>{contracts.contractdetail}</CardContent>
                      <div className="buttoncontainer">
                        <CardActions>
                          <Button
                            variant="raised"
                            size="small"
                            color="primary"
                            onClick={() => this.removeItem(contracts.id)}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </div>
                    </Card>
                  </Paper>
                </div>
              ))}
            </div>
          </div>
        </div>
      </body>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
