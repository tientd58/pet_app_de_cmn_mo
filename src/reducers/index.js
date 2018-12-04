import { combineReducers } from 'redux';
import Navigator from './navigation';
import Pet from './pet';
import MyError from './error';
import Auth from './auth';
import Profile from './profile';
import Coffee from './coffee';
import Service from './service';

export default combineReducers({
	Navigator,
	MyError,
	Auth,
	Pet,
	Profile,
	Coffee,
	Service,
});
