import React, { Component } from 'react';
import './BookService.css';
class BookService extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isLoading: true,
      data: []
    }
  }
  componentDidMount(){
     fetch('http://52.69.49.40/assignment/getServiceData.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson
        });
        this.printData(this.state.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  printData(data){
    return { __html: this.state.data.subcategoryDescription}
  }
  handleChange(event){
    let price1 = "",
        price2 = "",
        price2A = "";
        if(event.target.parentElement.getAttribute("id") === "serviceType"){
        price1 = event.target.options[event.target.selectedIndex].getAttribute("data-variablepaynowcost")
        price2 = document.querySelector("#serviceFrequency select").value;
        price2A = document.querySelector("#serviceFrequency select").options[document.querySelector("#serviceFrequency select").selectedIndex].getAttribute("data-multiplyingFactor");
      }else if(event.target.parentElement.getAttribute("id") === "serviceFrequency"){
        price1 = event.target.options[event.target.selectedIndex].getAttribute("data-multiplyingFactor")
        price2 = document.querySelector("#serviceType select").value;
        price2A = document.querySelector("#serviceType select").options[document.querySelector("#serviceType select").selectedIndex].getAttribute("data-variablepaynowcost");
      }
      calculation(price1, price2,price2A)
  }
  handleSubmit(event){
    event.preventDefault();
    var val = {};
	  val.service = document.querySelector("#service select").value;
	  val.serviceType = document.querySelector("#serviceType select").value;
	  val.serviceFrequency = document.querySelector("#serviceFrequency select").value;
    val.date = document.querySelector("#date input").value;
    val.time = document.querySelector("#time select").value;
    val.comment = document.querySelector("#comment input").value;
    val.finalPrice = document.querySelector("#finalPrice").innerText;
	  localStorage.setItem('serviceBookingValue', JSON.stringify(val));
  }
  render(){
    const { isLoading } = this.state;
    if(this.state.isLoading) {
  	   return (
        <div className="">
          Loading....
        </div>
  		)
    }
    return(
  <div>
    <div className="Bookservice-wrapper">
        <form methd="get" action="#" id="bookservice" onSubmit={this.handleSubmit}>
            <div id="service" className="row">
				<div className="col-25">
				  <strong> Service:</strong>
				</div>
				<div className="col-75">
					<select>
						<option selected>Cleaning</option>
					</select>
				</div>
            </div>
            <div  className="row">
				<div className="col-25">
					<strong> Type:</strong>
				</div>
				<div id="serviceType" className="col-75">
					<select variableName="variable"  value={this.state.data.variable} onChange={this.handleChange}>
						{this.state.data.variableData.map((e, key) => {
							return <option data-variablepaynowcost={e.variablePayNowCost} key={key} value={e.value}>{e.variableName}</option>;
						})}
					</select>
				</div>
          </div>
          <div  className="row">
				<div className="col-25">
					<strong>Frequency:</strong>
				</div>
				<div id="serviceFrequency" className="col-75">
					<select caption="frequency"   value={this.state.data.frequency} onChange={this.handleChange}>
						{this.state.data.frequencyData.map((e, key) => {
							return <option data-multiplyingFactor={e.multiplyingFactor} key={key} value={e.value}>{e.caption}</option>;
						})}
					</select>
				</div>
			</div>
			<div id="date" className="row">
				<div className="col-25">
					<strong>Date:</strong>
				</div>
				<div className="col-75">
					<input  type="date" />
				</div>
			</div>
			<div id="time" className="row">
				<div className="col-25">
					<strong>Time:</strong>
				</div>
				<div className="col-75">
					<select>
						<option>Select Time:</option>
						<option>1 PM</option>
						<option>2 PM</option>
						<option>3 PM</option>
					</select>
				</div>
			</div>
			<div id="comment" className="row">
				<div className="col-25">
					<strong> Comment:</strong>
				</div>
				<div className="col-75">
					<input type="text"   placeholder="comment here"/>
				</div>
			</div>
			<div className="row">
				<div className="col-25">
					<strong>ServiceTotal:</strong>
				</div>
				<div className="col-75">
					<span>&#8377;</span><span id="finalPrice">1499</span>
				</div>
			</div>
			<button type="submit">Book Service</button>
		</form>
    </div>
    <div>
      <div className="subCategory-wrapper" dangerouslySetInnerHTML={this.printData()}></div>
    </div>
</div>
    );
  }
}
function calculation(price1, price2,price2A) {
  document.querySelector("#finalPrice").innerText = parseFloat(price1) * parseFloat(price2A)
}
export default BookService
