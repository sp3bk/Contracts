import React, { Component } from "react";
import "./App.css";
import App from "./App";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
});
class Form extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="center">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            onChange={e => this.props.updateParent("name", e.target.value)}
            margin="normal"
          />
          <div />
          <TextField
            id="gender"
            label="Gender"
            className={classes.textField}
            onChange={e => this.props.updateParent("gender", e.target.value)}
            margin="normal"
          />
          <div />
          <TextField
            id="company"
            label="Company"
            className={classes.textField}
            onChange={e => this.props.updateParent("company", e.target.value)}
            margin="normal"
          />
          <div />
          <TextField
            id="contractdetail"
            label="Contract Detail"
            className={classes.textField}
            onChange={e =>
              this.props.updateParent("contractdetail", e.target.value)
            }
            margin="normal"
          />
          <div />
          <Button color="primary" onClick={e => this.props.clicker(e)}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
