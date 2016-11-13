import { performRequest } from './utils'

export default class Model {
	constructor(attributes) {
		this.attributes = attributes;
	}

	save() {
		if (this.get('_id')) {
			return performRequest({
				method: 'PUT',
				data: this.attributes,
				url: this.constructor.url + this.get('_id')
			});
		} else {
			return performRequest({
				method: 'POST',
				data: this.attributes,
				url: this.constructor.url
			}).then((obj) => {
				this.set({
					_id: obj._id
				});
			});
		}
	}

	delete() {
		return performRequest({
			method: 'DELETE',
			url: this.constructor.url + this.get('_id')
		}).then((obj) => {
			this.set({
				_id: null
			});
		});
	}

	set(attributes) {
		this.attributes = Object.assign({},
			this.attributes,
			attributes
		)
	}

	get(propName) {
		return this.attributes[propName];
	}

	static find(id) {
		return performRequest({
			method: 'GET',
			url: this.url + id
		}).then((obj) => {
			return new this(obj);
		});
	}

	static findAll() {
		return performRequest({
			method: 'GET',
			url: this.url
		}).then((results) => {
			return results.map((obj) => {
				return new this(obj);
			});
		});
	}
}










