import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { bindActionCreators } from 'redux';
import { deleteBookAction, 
	modifyBookAction } from '../../../actions/BookActions';

export class AllBooks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title,
			description: this.props.description,
			isbn: this.props.isbn,
			author: this.props.author,
			prodYear: this.props.prodYear,
			total: this.props.total,
			currentBook: {},
			edit: false,
			displayBook: true
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.changeView = this.changeView.bind(this);
	}

	/**
	 * 
	 * Handles the delete book actioon
	 * 
	 * @memberOf AllBooks
	 */
	handleClick() {
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover it back!',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				this.props.actions.deleteBookAction(this.props.id).then((response) => {
					swal(response, { icon: 'success' });
				});
			} else {
				swal('Book was not deleted');
			}
		});
	}

	/**
	 * 
	 * 
	 * Toggles the application display
	 * 
	 * @memberOf AllBooks
	 */
	onClick() {
		this.setState({ 
			displayBook: false, 
			edit: true 
		});
	}

	/**
	 * 
	 * 
	 * Toggles the application display
	 * 
	 * @memberOf AllBooks
	 */
	changeView() {
		this.setState({ displayBook: true, edit: false });
	}
	
	/**
	 * 
	 * Submits the form data
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf AllBooks
	 */
	handleFormSubmit(event) {
		event.preventDefault();
		this.props.actions.modifyBookAction(this.state, this.props.id)
		this.setState({
			displayBook: true, 
			edit: false 
		})
	}

	/**
	 * 
	 * Executes when the input box value changes
	 * @param {Object} event 
	 * 
	 * @memberOf AllBooks
	 */
	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	/**
	 * 
	 * Displays the component
	 * @returns {Object}
	 * 
	 * @memberOf AllBooks
	 */
	render() {
		const style = {
			file: {
				backgroundColor: 'white'
			},
			edit: {
				backgroundColor: 'rgb(10, 89, 79)',
				color: '#fff',
				float: 'right'
			},
			cancel: {
				backgroundColor: 'rgb(10, 89, 79)',
				color: '#fff',
				float: 'left'
			}
		};

		return (
			<div className="col s12 m3 l3" style={style.file}>
				{this.state.edit && (
					<div className="modal-content">
						<h4
							style={{
								alignContent: 'center'
							}}
						>
							Edit Book
						</h4>
						<div className="row">
							<form name="edit_book" className="col s12" onSubmit={this.handleFormSubmit}>
								<div className="add-book">
									<div className="row">
										<div className="input-field col s12">
											<b>Title</b>
											<input
												id="title"
												type="text"
												name="title"
												onChange={this.onChange}
												defaultValue={this.state.title}
												className="validate"
												required
											/>
										</div>
									</div>
									<div className="row">
										<div className="input-field col s12">
											<b>Author</b>
											<input
												id="author"
												type="text"
												name="author"
												className="validate"
												onChange={this.onChange}
												defaultValue={this.state.author}
												required
											/>
										</div>
									</div>
									<div className="row">
										<div className="input-field col s6">
											<b>Total</b>
											<input
												id="total"
												name="total"
												type="number"
												className="validate"
												onChange={this.onChange}
												defaultValue={this.state.total}
												required
											/>
										</div>
										<div className="input-field col s6">
											<b>Year</b>
											<input
												id="prodYear"
												name="prodYear"
												type="number"
												defaultValue={this.state.prodYear}
												onChange={this.onChange}
												className="validate"
												required
											/>
										</div>
									</div>
								</div>
								<button id="submit_edit" style={style.edit} type="submit" name="submit">
									Edit Book
								</button>
								<div>
									<button style={style.cancel} onClick={this.changeView} id="edit_button">
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{this.state.displayBook && (
					<div className="card" id="book_card">
						<div className="card-image">
							<img height="250px" src={this.props.cover} alt="loading image..." />
							<span className="card-title">{this.props.title}</span>
						</div>
						<div className="truncate card-content">
							<p>{this.props.description}</p>
						</div>
						<div className="card-action">
							<a onClick={this.handleClick} id="delete_button">
								Delete
							</a>
							<a onClick={this.onClick} id="edit_button">
								Edit
							</a>
						</div>
					</div>
				)}
			</div>
		);
	}
}

/**
 * 
 * Maps dispatch to the component props
 * @param {Object} dispatch 
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				deleteBookAction,
				modifyBookAction
			},
			dispatch
		)
	};
}

export default connect(null, mapDispatchToProps)(AllBooks);
