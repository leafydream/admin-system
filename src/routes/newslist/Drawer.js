import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class DrawerComponent extends Component {
  constructor(props) {
    super(props);
  }
  handleToggle = () => {
    this.props.handleClick();
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Drawer openSecondary={true}
                  docked={false}
                  width={`50%`}
                  open={this.props.open}
          >
            <AppBar title={this.props.title} onTouchTap={this.handleToggle}  iconElementRight={<IconButton onClick={this.handleToggle}><NavigationClose /></IconButton>}/>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default DrawerComponent;

