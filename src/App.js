import React, { Component } from 'react';
import { HasAnimals, HasGp} from './resources/Logic';
import { Appbar, Panel, Input, Button, Divider, Tabs, Tab} from 'muicss/react';
//import logo from './logo.svg';
import logo from './resources/MerchantsMate.png';
import './App.css';

class App extends Component {
    state = {
      animalLocation: '',
      gpLocation: '',

      activeAboutPanel: true,
      activeTab: 0
    };
    onTabChange = (i, value, tab, ev) => {
        this.setState({
            activeTab: i
        });
    };
    onTabActive = () => {
        console.log("well well well...");//arguments
    };
    onClickAnimals = () => {
        let animalIds = document.getElementById('animalIds').value;
        let location = document.getElementById('locationSquare').value;
        let whereToGo = HasAnimals(animalIds,location);
        this.setState({
            animalLocation: whereToGo
        })
    };
    onClickGp = () => {
        let location = document.getElementById('locationGp').value;
        if(location){
            let whereToGo = HasGp(location);
            this.setState({
                gpLocation: whereToGo
            })
        }
    };
    render() {
    return (
      <div>
          <Appbar style={{height:'fit-content',width:'100vw',background:'#ffffff', padding:'5px 5px 5px 5px'}}>
              <table width="100%">
                  <tbody>
                      <tr>
                          <td className="mui--appbar-height">
                              <img src={logo} alt="The Merchant's Mate" style={{height:'150px'}}/>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <Tabs style={{width:'fit-content',background:'#efefef', borderRadius: '5px'}} onChange={this.onTabChange} defaultSelectedIndex={0}>
                                  <Tab  value="pane-1" label="Animals" onActive={this.onTabActive}/>
                                  <Tab  value="pane-2" label="GunPowder"/>
                              </Tabs>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </Appbar>
      <div style={{backgroundColor:'#efefef', width: '100%'}}>
          <div style={{margin:'2vh 2vw 2vh 2vw'}}>
              {!this.state.activeTab &&
              <Panel style={{height:'fit-content',width:'375px'}}>
                  <h2 id="animalSearch">&ensp;Search for Animals</h2>
                  <Divider/>
                  <p>&nbsp;&emsp;Animal Id's</p>
                  <ul>
                      <li>1. Chicken</li>
                      <li>2. Pig</li>
                      <li>3. Snek</li>
                  </ul>
                  <p>Please input your coordinate location</p>
                  <Input type="text" id="locationSquare" size="25" placeholder="Location - Ex. B15"/>
                  <h4>Please input a comma-separated list of Animal Id Numbers</h4>
                  <Input type="text" id="animalIds" size="10" placeholder="Id's - Ex. 1,2"/>
                  <Button style={{width:'100%'}} color="primary" onClick={this.onClickAnimals}>Search</Button><br/>
                  <ul style={{width:'90%'}} id="resultIsland">{this.state.animalLocation}</ul>
              </Panel>
              }

              {this.state.activeTab === 1 &&
              <Panel style={{height:'fit-content', width:'375px'}}>
                  <h2 id="powderSearch">&ensp;Search for Gunpowder</h2>
                  <Divider/>
                  <p>Gunpowder is most commonly found on Forts and Large Islands</p>
                  <br/>
                  <p>Please input your coordinate location</p>
                  <Input type="text" id="locationGp" size="25" placeholder="Location - Ex. B15"/>
                  <Button style={{width:'100%'}} color="primary" onClick={this.onClickGp}>Search</Button><br/>
                  <ul style={{width:'90%'}} id="resultFort">{this.state.gpLocation}</ul>
              </Panel>
              }

              {this.state.activeAboutPanel &&
              <Panel style={{ height: 'fit-content', width:'375px'}}>
                  <Button size="small"
                          variant="fab"
                          color="primary"
                          onClick={() => this.setState({
                              activeAboutPanel: false
                          })}
                  >x
                  </Button>
                  <div className="mui--text-center">
                      <h2>About</h2>
                      <p>This currently supports searching for 1-2 animals at once<br/>as well as searching for
                          gunpowder
                      </p>
                  </div>
              </Panel>
              }

              {!this.state.activeAboutPanel &&
              <div className="mui--text-center">
                  <Button
                      size="small"
                      color="primary"
                      onClick={() => this.setState({
                          activeAboutPanel: true
                      })}
                  >About
                  </Button>
              </div>
              }
              <br/>
          </div>
      </div>
      </div>
    );
  }
}

export default App;
