import React, { Component } from 'react';
import './anomalyData.css';

class AnomalyResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            anomalyData: props.AnomalyArr, //when arrive new Arr
            status: "Upload Train and Detect CSV Files"
        };
    }
    //when update component
    componentWillReceiveProps(newProps){
        this.setState({ anomalyData: newProps.AnomalyArr})
        if(this.state.anomalyData.length == [])
            this.setState({status: "No Anomalies Found"})
        else
            this.setState({status: "Anomaly Result"})
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <h3>{this.state.status}</h3>
                {this.state.status == "Anomaly Result"? 
                <div>
                <table>
                    <tr>
                        <th>Row</th>
                        <th>Features</th>
                    </tr>
                    { this.state.anomalyData.map(row => (
                    <tr>
                        <td>
                        {row[0]}
                        </td>
                        <td>
                        {row[1]}
                        </td>
                    </tr>))}
                </table>
                </div>
                : ""}
            </div>
        );
    }
}  
export default AnomalyResult;