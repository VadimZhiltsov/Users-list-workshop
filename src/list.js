import UserModel from './UserModel';

export default async function initPage() {

	const data = await UserModel.findAll()

	debugger;

}