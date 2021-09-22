import { post } from 'jquery';
import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
      this.state = { forecasts: [], loading: true };
      this.postWeatherData = this.postWeatherData.bind(this);
      this.printFuck = this.printFuck.bind(this);
    }

    printFuck() {
        /*console.log(document.getElementById('tabelLabel'));*/
        console.log(document.getElementsByClassName('muie'));
        setTimeout(() => { console.log(document.getElementById('tabelLabel')) }, 300000000);
    }

    componentDidMount() {
        this.populateWeatherData();
        /*this.postWeatherData();*/
    }

 
    async postWeatherData() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify("Hey");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://localhost:44380/weatherforecast/Postweather", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
            <h1 id="tabelLabel" >Weather forecast</h1>
            <form id="populateData" onSubmit={async () => await this.postWeatherData()}>
                <input className="muie"></input>
                <button type="submit">Submit</button>
                </form>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
      </div>
      );
  }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
