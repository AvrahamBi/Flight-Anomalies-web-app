import React, { Component } from 'react';
import './DropBoxCsv.css';
import { parase } from "papaparse";
import Toggle from "react-toggle";
import "react-toggle/style.css";





class DropBoxCSV extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Learnhighlighted: false,
            Detecthighlighted: false,
            isLearnMode: false,
            isHybrid: true,
            DataLearn: [],
            DataDetect: [],
            AnomalyArr: ["asd"],
            modelTrainID: 0
        }
        
    }
    
    componentDidMount() {

    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        this.props.getChoice(selectedOption)
      };

    sendCSV() {
        fetch(`http://localhost:8080/api/model?model_type=${this.state.isHybrid? 'hybrid': 'regression'}`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({Learn: this.state.DataLearn , Detect: this.state.DataDetect}) //sending json each array is a row in csv file
        })
        .then(response => response.json())
        .then(data => {
          this.setState({AnomalyArr: data});
        //   console.log("getting fetch  ", data)
          this.props.getAnomalyArr(data)
        //   console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    
    render() {
        return (
            <div>
                <h3>Upload CSV Files</h3>

                {/* Toggle Hybrid / Regression */}
                <div className="ToggleDiv">
                    <span className="span-left">Hybrid</span>
                    <Toggle 
                        className="Toggle"
                        defaultChecked={!this.state.isHybrid}
                        icons={false}
                        onChange={(toggle) => this.setState({isHybrid: !this.state.isHybrid})}
                        />
                    <span className="span-right">Regression</span>
                </div>
                {/* Drop Zone Train */}
                <div className={this.state.Learnhighlighted? "drop-box-highlighted" :"drop-box"} 
                onDragEnter={() => {this.setState({Learnhighlighted: true})}}
                onDragLeave={() => {this.setState({Learnhighlighted: false})}}
                //on drag file to box
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}

                //on drop file her
                onDrop={(e)=> {
                    this.setState({Learnhighlighted: false});
                    e.preventDefault();
                    e.stopPropagation();
                    var that = this;

                    // For windows
                    Array.from(e.dataTransfer.files) 
                    .filter((file) => file.type ===  "application/vnd.ms-excel")
                    .forEach( async (file) => {
                        const fileReader = new FileReader();
                        fileReader.readAsText(file);
                        fileReader.onload = function() {
                            const dataset = fileReader.result;
                            const result = dataset.split('\r\n').map(data => data.split(','));

                            that.setState({DataLearn: result}, () => {
                                //console.log(that.state.DataLearn)
                            })
                        };
                    });

                    //For linux
                    Array.from(e.dataTransfer.files) 
                    .filter((file) => file.type === "text/csv")
                    .forEach( async (file) => {
                        const DataLearn = await file.text();
                        const result = parase(test);
                        that.setState({DataLearn: result}, () => {
                                //console.log(that.state.text)
                            });
                        //console.log(result);
                    });
                }
                }
                >Drop Train CSV Here
                </div>
 


                
                <br></br>
                
                {/* Drop Zone Detect */}
                <div className={this.state.Detecthighlighted? "drop-box-highlighted" :"drop-box"} 
                onDragEnter={() => {this.setState({Detecthighlighted: true})}}
                onDragLeave={() => {this.setState({Detecthighlighted: false})}}
                //on drag file to box
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}

                //on drop file her
                onDrop={(e)=> {
                    this.setState({Detecthighlighted: false});
                    e.preventDefault();
                    e.stopPropagation();
                    var that = this;

                    // For windows
                    Array.from(e.dataTransfer.files) 
                    .filter((file) => file.type ===  "application/vnd.ms-excel")
                    .forEach( async (file) => {
                        const fileReader = new FileReader();
                        fileReader.readAsText(file);
                        fileReader.onload = function() {
                            const dataset = fileReader.result;
                            const result = dataset.split('\r\n').map(data => data.split(','));

                            that.setState({DataDetect: result}, () => {
                                //console.log(that.state.DataDetect)
                            })
                        };
                    });

                    //For linux
                    Array.from(e.dataTransfer.files) 
                    .filter((file) => file.type === "text/csv")
                    .forEach( async (file) => {
                        const DataDetect = await file.text();
                        const result = parase(test);
                        that.setState({DataDetect: result}, () => {
                                //console.log(that.state.DataDetect)
                            });
                        //console.log(result);
                    });
                }
                }
                >Drop Detect CSV Here
                </div>


                <div>
                    <button disabled={(this.state.DataDetect.length === 0) || (this.state.DataLearn.length === 0)}
                        onClick={() => this.sendCSV()}>
                            Upload CSV Files</button>
                </div>
            </div>
            
            




          );
    }
}
export default DropBoxCSV;